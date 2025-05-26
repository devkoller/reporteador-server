import { DuckDBManager } from "./duckdbManager"

class DuckDB {
	public saveQueryResult = async (tableName: string, data: any[]) => {
		try {
			const db = await DuckDBManager.init()

			await db.syncTable(tableName, data)
			console.log("Sync table", tableName)

			await db.insert(tableName, data)
			console.log("Insert data", tableName)

			await db.close()
		} catch (error) {
			throw new Error("Error in saveQueryResult: " + error)
		}
	}

	public syncTable = async (tableName: string, data: any[]) => {
		try {
			const db = await DuckDBManager.init()

			await db.syncTable(tableName, data)
			console.log("Sync table", tableName)

			await db.close()
		} catch (error) {
			throw new Error("Error in syncTable: " + error)
		}
	}

	public upsertTable = async (
		tableName: string,
		data: any[],
		keyCols: string[]
	) => {
		try {
			const db = await DuckDBManager.init()

			await db.upsertTable(tableName, data, keyCols)
			console.log("upsert table", tableName)

			await db.close()
		} catch (error) {
			throw new Error("Error in syncTable: " + error)
		}
	}

	public run = async (sql: string) => {
		try {
			const db = await DuckDBManager.init()
			await db.run(sql)
			console.log("Run query", sql)
			await db.close()
		} catch (error) {
			throw new Error("Error in run: " + error)
		}
	}

	public readQueryResult = async (tableName: string, sql?: string) => {
		console.log(
			"🚀 > duckHandler.ts:62 > DuckDB > readQueryResult= > sql:",
			sql
		)
		const query = sql || `SELECT * FROM ${tableName}`
		if (!tableName) {
			throw new Error("Table name is required")
		}
		const db = await DuckDBManager.init()

		const todos = await db.query<any>(query)

		await db.close()
		return todos
	}
}

export default new DuckDB()
