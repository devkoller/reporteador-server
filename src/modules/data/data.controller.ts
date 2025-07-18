import DataService from "./data.service"
import { DuckDB } from "@/core"
import { getAgeGroup, helpers } from "@/core/utils/functions"
import fs from "fs"
import path from "path"
import { ChartJSNodeCanvas } from "chartjs-node-canvas"

const client = require("@jsreport/nodejs-client")(
	process.env.JSREPORT_URL,
	process.env.JSREPORT_USER,
	process.env.JSREPORT_PASSWORD
)

type genericType = {
	[key: string]: any
}

interface functionProps {
	body: genericType | null
	query: genericType | null
	params: genericType | null
}

class Data {
	constructor() {
		this.vContratos_adquisiciones = this.vContratos_adquisiciones.bind(this)
		this.getNumLicitacion = this.getNumLicitacion.bind(this)
		this.getEjercicio = this.getEjercicio.bind(this)
		this.getCodArticulo = this.getCodArticulo.bind(this)
		this.vSuficiencia = this.vSuficiencia.bind(this)

		this.pdfReport = this.pdfReport.bind(this)
		this.getData = this.getData.bind(this)

		this.getOrderNumLicitacion = this.getOrderNumLicitacion.bind(this)
		this.getOrderEjercicio = this.getOrderEjercicio.bind(this)
		this.getOrderCodArticulo = this.getOrderCodArticulo.bind(this)
		this.vOrdenes_compra = this.vOrdenes_compra.bind(this)
	}

	async getNumLicitacion({ query }: functionProps) {
		try {
			let whereQuery = ""
			if (query?.ejercicio) {
				whereQuery = `AND ejercicio = :ejercicio`
			}

			const queryString = `
        SELECT 
            num_licitacion as value,
            num_licitacion as label
        FROM vContratos_adquisiciones_2
        WHERE 1=1 ${whereQuery}
        GROUP BY num_licitacion
        ORDER BY num_licitacion DESC
      `

			const replacements = {
				ejercicio: query?.ejercicio || null,
			}

			const data = await DataService.read(queryString, replacements)

			return {
				status: 200,
				message: "Datas read successfully",
				data,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async getEjercicio({}: functionProps) {
		try {
			const queryString = `
        SELECT 
            ejercicio as value,
            ejercicio as label
        FROM vContratos_adquisiciones_2
        GROUP BY ejercicio
        ORDER BY ejercicio DESC
      `

			const data = await DataService.read(queryString)

			return {
				status: 200,
				message: "Datas read successfully",
				data,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async getCodArticulo({ query }: functionProps) {
		try {
			let whereQuery = ""

			if (query?.ejercicio) {
				whereQuery = `AND ejercicio = :ejercicio`
			}

			if (query?.num_licitacion) {
				whereQuery += ` AND num_licitacion = :num_licitacion`
			}

			const queryString = `
        SELECT 
            cod_bar_mc_pr as value,
            cod_bar_mc_pr as label
        FROM vContratos_adquisiciones_2
        WHERE 1=1 ${whereQuery}
        GROUP BY cod_bar_mc_pr
        ORDER BY cod_bar_mc_pr DESC
      `

			const replacements: any = {
				ejercicio: query?.ejercicio || null,
				num_licitacion: query?.num_licitacion || null,
			}

			const data = await DataService.read(queryString, replacements)

			return {
				status: 200,
				message: "Datas read successfully",
				data,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async getOrderNumLicitacion({ query }: functionProps) {
		try {
			let whereQuery = ""
			if (query?.ejercicio) {
				whereQuery = `AND año = :ejercicio`
			}

			const queryString = `
        SELECT 
            num_licitacion as value,
            num_licitacion as label
        FROM vOrdenes_compra
        WHERE 1=1 ${whereQuery}
        GROUP BY num_licitacion
        ORDER BY num_licitacion DESC
      `

			const replacements = {
				ejercicio: query?.ejercicio || null,
			}

			const data = await DataService.read(queryString, replacements)

			return {
				status: 200,
				message: "Datas read successfully",
				data,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async getOrderEjercicio({}: functionProps) {
		try {
			const queryString = `
        SELECT 
            año as value,
            año as label
        FROM vOrdenes_compra
        GROUP BY año
        ORDER BY año DESC
      `

			const data = await DataService.read(queryString)

			return {
				status: 200,
				message: "Datas read successfully",
				data,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async getOrderCodArticulo({ query }: functionProps) {
		try {
			let whereQuery = ""

			if (query?.ejercicio) {
				whereQuery = `AND año = :ejercicio`
			}

			if (query?.num_licitacion) {
				whereQuery += ` AND num_licitacion = :num_licitacion`
			}

			const queryString = `
        SELECT 
          top 5000
            cod_bar_mc_pr as value,
            cod_bar_mc_pr as label
        FROM vOrdenes_compra
        WHERE 1=1 ${whereQuery}
        GROUP BY cod_bar_mc_pr
        ORDER BY cod_bar_mc_pr DESC
      `

			const replacements: any = {
				ejercicio: query?.ejercicio || null,
				num_licitacion: query?.num_licitacion || null,
			}

			const data = await DataService.read(queryString, replacements)

			return {
				status: 200,
				message: "Datas read successfully",
				data,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async vContratos_adquisiciones({ body }: functionProps) {
		const { num_licitacion, cod_bar_mc_pr, ejercicio } = body || {}

		try {
			let whereClause = ""

			if (num_licitacion) {
				whereClause += ` AND num_licitacion = :num_licitacion`
			}

			if (cod_bar_mc_pr) {
				whereClause += ` AND cod_bar_mc_pr = :cod_bar_mc_pr`
			}

			if (ejercicio) {
				whereClause += ` AND ejercicio = :ejercicio`
			}

			const queryString = `
        SELECT 
            *,
            max - consumido as disponible,
            maximo_dinero - consumo as disponible_dinero,
            CONVERT(VARCHAR(10), fecha, 103) as fecha,
            CONVERT(VARCHAR(10), vigencia_fin, 103) as vigencia_fin,
            CONVERT(VARCHAR(10), vigencia_inicio, 103) as vigencia_inicio
        FROM vContratos_adquisiciones_2
        where 1=1 ${whereClause}
        order by proveedo_nom
      `

			const replacements = {
				num_licitacion,
				cod_bar_mc_pr,
				ejercicio,
			}

			console.time("vContratos_adquisiciones")
			const data = await DataService.read(queryString, replacements)
			console.timeEnd("vContratos_adquisiciones")

			return {
				status: 200,
				message: "Datas read successfully",
				data,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async vOrdenes_compra({ body }: functionProps) {
		const { num_licitacion, cod_bar_mc_pr, ejercicio } = body || {}
		try {
			let whereClause = ""

			if (num_licitacion) {
				whereClause += ` AND num_licitacion = :num_licitacion`
			}

			if (cod_bar_mc_pr) {
				whereClause += ` AND cod_bar_mc_pr = :cod_bar_mc_pr`
			}

			if (ejercicio) {
				whereClause += ` AND año = :ejercicio`
			}

			const queryString = `
        SELECT 
          *,
          CONVERT(VARCHAR(10), fecha_envio, 103) as fecha_envio
        FROM vOrdenes_compra
        where 1=1 ${whereClause}
        ORDER BY año DESC
      `

			const replacements = {
				num_licitacion,
				cod_bar_mc_pr,
				ejercicio,
			}

			console.time("vOrdenes_compra")
			const data = await DataService.read(queryString, replacements)
			console.timeEnd("vOrdenes_compra")

			return {
				status: 200,
				message: "Datas read successfully",
				data,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async vSuficiencia({ query, params }: functionProps) {
		try {
			const queryString = `
        SELECT
          TOP 25000
          *,
          CONVERT(VARCHAR(10), fech_alta, 103) as fech_alta,
          CONVERT(VARCHAR(10), fech_cier, 103) as fech_cier
         
        FROM vSuficiencia
      `

			const replacements = {}

			console.time("vSuficiencia")
			const data = await DataService.read(queryString, replacements)
			console.timeEnd("vSuficiencia")

			return {
				status: 200,
				message: "Datas read successfully",
				data,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async pdfReport({ body }: functionProps) {
		if (!body) {
			throw new Error("Query is required")
		}
		try {
			const { start, end, type, typeReport, title, filters, columns, charts } =
				body

			let result = await this.getData({
				type,
				start,
				end,
				typeReport,
			})

			let filteredData = await this.filterData({
				data: result,
				filter: filters,
			})

			//generar un array de servicios con los nombres de los servicios y los registros que pertenezcan a ese servicio
			const servicios = filteredData.reduce((acc: any, item: any) => {
				const servicio =
					item.servicio_cama === "0" ? "Desconocido" : item.servicio_cama
				if (!acc[servicio]) {
					acc[servicio] = []
				}
				acc[servicio].push(item)
				return acc
			}, {})
			//generar un array de servicios con los nombres de los servicios y la cantidad de registros que pertenezcan a ese servicio
			const serviciosCount = Object.keys(servicios).map((servicio) => {
				return {
					servicio,
					rows: servicios[servicio],
				}
			})

			// construct a string with the columns to be shown on html
			const columnsString = columns
				.map((col: any) => {
					return `<th class="border border-zinc-300 py-1 px-1 text-center">${col.header}</th>`
				})
				.join("\n")

			const replacedColumnsString = columns
				.map((col: any) => {
					return `<td class="border border-zinc-300 py-1 px-1 text-center font-normal {{${col.accessorKey}}}">
          {{formatText ${col.accessorKey}}}
          </td>`
				})
				.join("\n")

			const main = fs.readFileSync(
				path.join(__dirname, "../../../src/reports/html/report.html"),
				"utf8"
			)

			const mainExcel = fs.readFileSync(
				path.join(__dirname, "../../../src/reports/html/reportToExcel.html"),
				"utf8"
			)

			const logo = fs.readFileSync(
				path.join(__dirname, "../../../src/reports/assets/hcg.png")
			)

			const chartImages: any = []

			for (let element of charts) {
				const charter = new ChartJSNodeCanvas({
					width: element.type === "bar" ? 1000 : 400,
					height: element.type === "bar" ? 400 : 300,
				})
				const counts: Record<string, number> = {}
				filteredData.forEach((item: any) => {
					let rawVal = (item[element.key] as any) || ""

					if (element.key === "AgeGroup") {
						rawVal = getAgeGroup(item["fecha_nac"])
					}
					if (rawVal === "0") {
						return
					}
					counts[rawVal] = (counts[rawVal] || 0) + 1
				})
				const sortedEntries = Object.entries(counts) // [['HF HEMODINAMIA',1], …]
					.sort(([, aValue], [, bValue]) => bValue - aValue)
				let total = filteredData.length

				const configuration = {
					type: element.type,
					data: {
						labels: sortedEntries.map(([key]) => key),
						datasets: [
							{
								label: element.title,
								data: sortedEntries.map(([, value]) => value),
							},
						],
					},
					options:
						element.type === "pie"
							? {
									responsive: false, // en Node no hay "ventana" que responda
									plugins: {
										legend: {
											position: "top",
											labels: {
												// Genera cada etiqueta manualmente
												generateLabels: (chart: any) => {
													const ds = chart.data.datasets[0] || []
													return chart.data.labels.map(
														(label: any, i: number) => {
															const value = ds.data[i]
															const pct = total
																? ((value / total) * 100).toFixed(1)
																: 0
															return {
																text: `${label}: ${value} (${pct}%)`,
																fillStyle: Array.isArray(ds?.backgroundColor)
																	? ds?.backgroundColor[i]
																	: ds?.backgroundColor,
																strokeStyle: Array.isArray(ds?.borderColor)
																	? ds?.borderColor[i]
																	: ds?.borderColor,
																lineWidth: ds?.borderWidth || 0,
																hidden: !chart.getDataVisibility(i) || false,
																index: i,
															}
														}
													)
												},
											},
										},
									},
									scales: {
										y: { beginAtZero: true },
									},
							  }
							: {},
				}
				const chartImage = await charter.renderToDataURL(configuration as any)
				chartImages.push({
					title: element.title,
					image: chartImage,
					css: element.css,
				})
			}

			let filteredDataString = await this.filterInformation({
				filter: filters,
			})

			const html = main
				.replace("*columns*", columnsString)
				.replace("*replacedColumns*", replacedColumnsString)
				.replace("*hcg*", logo.toString("base64"))

			const htmlExcel = mainExcel
				.replace("*columns*", columnsString)
				.replace("*replacedColumns*", replacedColumnsString)
				.replace("*hcg*", logo.toString("base64"))

			const reportStream = await client
				.render({
					template: {
						content: html,
						engine: "handlebars",
						recipe: "chrome-pdf",
						helpers: helpers(),
						chrome: {
							marginTop: "1cm",
							marginBottom: "2cm",
							marginLeft: "1cm",
							marginRight: "1cm",
							format: "letter",
							landscape: true,
						},
					},
					data: {
						title,
						date: new Date().toLocaleDateString("es-ES", {
							day: "2-digit",
							month: "2-digit",
							year: "numeric",
						}),
						servicios: serviciosCount,
						...filteredDataString,
						chartImages,
					},
				})
				.catch((error: { message: string | undefined }) => {
					throw new Error(
						error instanceof Error ? error.message : String(error)
					)
				})

			const reportExcelStream = await client
				.render({
					template: {
						content: htmlExcel,
						engine: "handlebars",
						recipe: "html-to-xlsx",
						helpers: helpers(),
						chrome: {},
					},
					data: {
						title,
						date: new Date().toLocaleDateString("es-ES", {
							day: "2-digit",
							month: "2-digit",
							year: "numeric",
						}),
						rows: filteredData,
						...filteredDataString,
						chartImages,
					},
				})
				.catch((error: { message: string | undefined }) => {
					throw new Error(
						error instanceof Error ? error.message : String(error)
					)
				})

			const chunks: any = []
			const chunksExcel: any = []

			let base64 = await new Promise((resolve, reject) => {
				reportStream.on("data", (chunk: any) => chunks.push(chunk))
				reportStream.on("end", () => {
					const buffer = Buffer.concat(chunks)
					const base64 = buffer.toString("base64")
					resolve(base64)
				})
				reportStream.on("error", reject)
			})

			let base64Excel = await new Promise((resolve, reject) => {
				reportExcelStream.on("data", (chunk: any) => chunksExcel.push(chunk))
				reportExcelStream.on("end", () => {
					const buffer = Buffer.concat(chunksExcel)
					const base64 = buffer.toString("base64")
					resolve(base64)
				})
				reportExcelStream.on("error", reject)
			})

			// const reportKey = type as keyof typeof functionsDataReports
			// const data = await functionsDataReports[reportKey]({
			// 	query: { start, end, typeReport },
			// 	params: {},
			// 	body: null,
			// })

			return {
				status: 200,
				message: "Datas read successfully",
				data: {
					pdf: base64,
					excel: base64Excel,
				},
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async getData({ type, start, end, typeReport }: any) {
		try {
			let result: any = []

			return result.data
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async filterData({ data, filter }: any) {
		try {
			let { searchFilters, filters, filterableKeys } = filter

			const filteredData = data.filter((item: any) => {
				// 1) exact-match include/exclude
				for (const key of filterableKeys) {
					let rawVal = (item[key] as any) || ""
					if (key === "AgeGroup") {
						rawVal = getAgeGroup(item["fecha_nac"])
					}
					const val = String(rawVal)

					const col = filters[key] || { include: [], exclude: [] }
					if (col.include.length > 0 && !col.include.includes(val)) {
						return false
					}
					if (col.exclude.length > 0 && col.exclude.includes(val)) {
						return false
					}

					// 2) text-based include/exclude
					const sf = searchFilters[key]
					if (
						sf?.include &&
						!val.toLowerCase().includes(sf.include.toLowerCase())
					) {
						return false
					}
					if (
						sf?.exclude &&
						val.toLowerCase().includes(sf.exclude.toLowerCase())
					) {
						return false
					}
				}

				return true
			})

			return filteredData
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async filterInformation({ filter }: any) {
		const { searchFilters, filters, filterableKeys } = filter
		try {
			let countFilters = (Object.keys(filters) as any).reduce(
				(acc: any, key: any) => {
					const filter = filters[key]
					if (filter && filter.include && filter.include.length > 0) {
						acc += filter.include.length
					}
					if (filter && filter.exclude && filter.exclude.length > 0) {
						acc += filter.exclude.length
					}
					return acc
				},
				0
			)

			// make a string with the keys of the filters at html to show at the report
			const filterKeys = Object.keys(filters).map((key) => {
				const filterObj = filters[key] || {}
				return Object.keys(filterObj).map((filterType) => {
					const filterValues = filterObj[filterType]
					if (filterValues && filterValues.length > 0) {
						return filterValues.map((value: any) => {
							return {
								key,
								filterType: filterType === "include" ? "Incluye" : "Excluye",
								value,
							}
						})
					} else {
						null
					}
				})
			})

			let countSearchFilters = (Object.keys(searchFilters) as any).reduce(
				(acc: any, key: any) => {
					const filter = searchFilters[key]
					if (filter && filter.include && filter.include.length > 0) {
						acc += 1
					}
					if (filter && filter.exclude && filter.exclude.length > 0) {
						acc += 1
					}
					return acc
				},
				0
			)

			const filteTextKeys = Object.keys(searchFilters).map((key) => {
				const filterObj = searchFilters[key] || {}

				return Object.keys(filterObj).map((filterType) => {
					const filterValues = filterObj[filterType]
					if (filterValues) {
						return {
							key,
							filterType: filterType === "include" ? "Incluye" : "Excluye",
							value: filterValues,
						}
					}
				})
			})

			let flat = filterKeys.flat(Infinity).filter((i) => i != null)

			let flaTexts = filteTextKeys.flat(Infinity).filter((i) => i != null)

			return {
				shouldShowFilters: countFilters > 0 || countSearchFilters > 0,
				filters: [...flat, ...flaTexts],
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}
}

export default new Data()
