import { DuckDBInstance, DuckDBConnection } from "@duckdb/node-api"
import path from "path"
import crypto from "crypto"
type Primitive = number | bigint | boolean | string | Date | null | undefined

function formatDateForDuckDB(date: Date): string {
	const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
	const YYYY = date.getFullYear()
	const MM = pad(date.getMonth() + 1)
	const DD = pad(date.getDate())
	const hh = pad(date.getHours())
	const mm = pad(date.getMinutes())
	const ss = pad(date.getSeconds())
	return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`
}

export class DuckDBManager {
	private instance: DuckDBInstance
	private connection: DuckDBConnection

	private constructor(instance: DuckDBInstance, connection: DuckDBConnection) {
		this.instance = instance
		this.connection = connection
	}

	public static async init(
		dbFile: string = path.resolve(__dirname, "./sigma.db")
	): Promise<DuckDBManager> {
		const instance = await DuckDBInstance.create(dbFile)
		const connection = await instance.connect()
		return new DuckDBManager(instance, connection)
	}

	public async run(sql: string): Promise<void> {
		await this.connection.run(sql)
	}

	public async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
		// 1. Ejecuta la consulta
		const mappedParams =
			params && params.length
				? params.map((p) =>
						p instanceof Date
							? formatDateForDuckDB(p)
							: typeof p === "bigint"
							? Number(p)
							: p
				  )
				: undefined
		const reader = await this.connection.runAndReadAll(sql, mappedParams)

		// 2. Saca los nombres de las columnas
		const columnNames: string[] = reader.columnNames()

		// 3. Las filas siguen siendo arrays
		const rawRows: any[][] = reader.getRows()

		// 4. Transforma cada fila-array en un objeto con clave=nombreColumna
		const result = rawRows.map((rowArr) => {
			const obj: any = {}
			rowArr.forEach((val, idx) => {
				let v = val
				// a) BigInt → Number
				if (typeof v === "bigint") {
					v = Number(v)
				}
				// b) DuckDBTimestampValue → Date
				else if (
					v != null &&
					typeof v === "object" &&
					"micros" in v &&
					typeof (v as any).micros === "bigint"
				) {
					const micros: bigint = (v as any).micros
					// micros es microsegundos desde epoch → milisegundos
					v = new Date(Number(micros / 1000n))
				}
				obj[columnNames[idx]] = v
			})
			return obj as T
		})

		return result
	}

	/**
	 * Crea o actualiza la tabla según los datos de ejemplo:
	 * - Si no existe, la crea con todos los campos inferidos.
	 * - Si existe, añade las columnas nuevas que falten.
	 */
	public async syncTable<T extends Record<string, Primitive>>(
		tableName: string,
		sampleData: T | T[]
	): Promise<void> {
		const rows = Array.isArray(sampleData) ? sampleData : [sampleData]
		if (rows.length === 0)
			throw new Error("Debe haber al menos un registro de ejemplo")

		// 1. Inferir columnas y tipos
		const sample = rows[0]
		const inferred: Record<string, string> = {}
		for (const [key, val] of Object.entries(sample)) {
			let tipo: string
			if (val === null || val === undefined) {
				tipo = "VARCHAR"
			} else if (typeof val === "boolean") {
				tipo = "BOOLEAN"
			} else if (typeof val === "bigint") {
				tipo = "BIGINT"
			} else if (typeof val === "number") {
				tipo = Number.isInteger(val) ? "INTEGER" : "DOUBLE"
			} else if (val instanceof Date) {
				tipo = "TIMESTAMP"
			} else {
				tipo = "VARCHAR"
			}
			inferred[key] = tipo
		}

		// 2. Obtener columnas existentes (si las hay)
		let existingCols = new Set<string>()
		try {
			const pragma = await this.query(`PRAGMA table_info('${tableName}');`)

			pragma.forEach((c) => {
				existingCols.add(c.name || c[1])
			})
		} catch (err: any) {
			// Si el error indica que no existe la tabla, la creamos de una vez
			if (err.message.includes("does not exist")) {
				const defs = Object.entries(inferred)
					.map(([col, type]) => `${col} ${type}`)
					.join(", ")
				await this.run(`CREATE TABLE ${tableName} (${defs});`)
				return
			}
			// Si es otro error, lo propagamos
			throw err
		}

		// 3. Si no existe la tabla, la creamos con TODO el schema
		for (const [col, type] of Object.entries(inferred)) {
			if (!existingCols.has(col)) {
				await this.run(`ALTER TABLE ${tableName} ADD COLUMN ${col} ${type};`)
			}
		}
	}

	public async close(): Promise<void> {
		this.connection.closeSync()
		this.instance.closeSync()
	}

	public async insert<T extends Record<string, any>>(
		tableName: string,
		data: T | T[]
	): Promise<void> {
		const rows = Array.isArray(data) ? data : [data]
		const colsInfo = await this.query(`PRAGMA table_info('${tableName}');`)
		const tableCols = colsInfo.map((c) => c[1] || c.name)
		const insertCols = Object.keys(rows[0]).filter((key) =>
			tableCols.includes(key)
		)
		if (insertCols.length === 0)
			throw new Error(`No hay columnas válidas para insertar en ${tableName}`)

		const placeholders = insertCols.map((_, i) => `$${i + 1}`).join(", ")
		const sql = `INSERT INTO ${tableName} (${insertCols.join(
			", "
		)}) VALUES (${placeholders});`
		const prep = await this.connection.prepare(sql)

		for (const row of rows) {
			insertCols.forEach((col, i) => {
				const val = row[col] || 0
				if (typeof val === "number") prep.bindInteger(i + 1, val)
				else if (typeof val === "bigint") prep.bindBigInt(i + 1, val)
				else if (typeof val === "boolean") prep.bindBoolean(i + 1, val)
				else if (val instanceof Date)
					prep.bindVarchar(i + 1, formatDateForDuckDB(val))
				else prep.bindVarchar(i + 1, String(val))
			})
			await prep.run()
		}
	}

	public async upsertTable<T extends Record<string, Primitive>>(
		tableName: string,
		data: T[],
		keyCols: (keyof T)[]
	): Promise<void> {
		if (!data.length) return

		// Normalize data rows: trim and convert 'null' strings
		const normalized = data.map((row) => {
			const out: any = {}
			Object.entries(row).forEach(([k, v]) => {
				if (typeof v === "string") {
					const t = v.trim()
					out[k] = t.toLowerCase() === "null" || t === "" ? null : t
				} else {
					out[k] = v
				}
			})
			return out as T
		})

		// 1) Setup staging
		const staging = `${tableName}_staging`
		await this.run(`DROP TABLE IF EXISTS ${staging};`)
		await this.run(
			`CREATE TEMPORARY TABLE ${staging} AS SELECT * FROM ${tableName} WHERE FALSE;`
		)
		await this.insert(staging, normalized)

		// 2) Build clauses
		const keys = keyCols.map((k) => k as string)
		const joinConds = keys
			.map((k) => `${tableName}.${k} = s.${k}`)
			.join(" AND ")
		const updateCols = Object.keys(normalized[0]).filter(
			(c) => !keys.includes(c)
		)
		const setClause = updateCols.map((c) => `${c} = s.${c}`).join(", ")
		const allCols = Object.keys(normalized[0])

		// 3) UPDATE existing
		await this.run(
			`UPDATE ${tableName}
			 SET ${setClause}
			 FROM ${staging} AS s
			 WHERE ${joinConds};`
		)

		// 4) INSERT new
		await this.run(
			`INSERT INTO ${tableName}(${allCols.join(",")})
			 SELECT ${allCols.map((c) => `s.${c}`).join(",")}
			 FROM ${staging} AS s
			 LEFT JOIN ${tableName} ON ${joinConds}
			 WHERE ${keys.map((k) => `${tableName}.${k} IS NULL`).join(" AND ")};`
		)

		// 5) Clean
		await this.run(`DROP TABLE IF EXISTS ${staging};`)
	}
}
