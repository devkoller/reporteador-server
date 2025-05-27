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
		this.vCitados = this.vCitados.bind(this)
		this.vIngresosAdministrativos = this.vIngresosAdministrativos.bind(this)
		this.vCirugias = this.vCirugias.bind(this)
		this.vUrgencias = this.vUrgencias.bind(this)
		this.vProductividad = this.vProductividad.bind(this)
		this.pdfReport = this.pdfReport.bind(this)
		this.getData = this.getData.bind(this)
	}

	async vCitados({ query, params }: functionProps) {
		try {
			if (!query) {
				throw new Error("Query is required")
			}
			const { start, end } = query
			const queryString = `
        SELECT 
            FORMAT(t_entrada, 'HH:mm', 'es-ES') as 'HoraEntrada'
          ,FORMAT(t_salida, 'HH:mm', 'es-ES') as 'HoraSalida'
          ,[FECHA] as 'Fecha'
          ,[HORA] as 'Hora'
          ,[Medico] as 'Agenda'
          ,[cod_estado]
          ,[estado] as 'EstadoCita'
          ,[TIPO_CITA] as 'Tipo'
          ,[centro_siglas] as 'Centro'
          ,[servicio] as 'Servicio'
          ,[cita]
          ,[codigo_visita]
          ,[visita] as 'Visita'
          ,[registro]
          ,[nombrecom]
          ,[fecha_nac]
          ,[nombre_sexo] as 'Genero'
          ,[apellido1]
          ,[apellido2]
          ,[nombre]
          ,[rud_emision]
          ,[login_emision] as 'Usuario'
          ,[estado_res] as 'Estado'
          ,[municipio] as 'Municipio'
          ,[localidad] as 'Localidad'
          ,[colonia] as 'Colonia' 
        FROM Reportes.dbo.vCITADOS_TODOS
        WHERE codigo_visita NOT IN ('QR') AND
          cod_estado NOT IN ('LI') AND
          ISNULL(n_solic, 0) != 0 AND
          convert(DATE, rtrim(FECHA), 103) 
          BETWEEN convert(DATE, rtrim(:start), 103) 
          and convert(DATE, rtrim(:end), 103)
        ORDER BY CONVERT(date, RTRIM(fecha), 103)
      `

			const replacements = {
				start,
				end,
			}
			console.time("vCitados")
			const data = await DataService.read(queryString, replacements)
			console.timeEnd("vCitados")

			return {
				status: 200,
				message: "Datas read successfully",
				data,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async vIngresosAdministrativos({ query, params }: functionProps) {
		try {
			if (!query) {
				throw new Error("Query is required")
			}
			const { start, end, type } = query
			let wherQuery = {
				Ingresos: `where  convert(DATE, rtrim(fechaing), 103) 
          BETWEEN convert(DATE, rtrim(:start), 103) 
          and convert(DATE, rtrim(:end), 103)
          ORDER by fechaing`,

				Egresos: `where  convert(DATE, rtrim(fechaegr), 103) 
          BETWEEN convert(DATE, rtrim(:start), 103) 
          and convert(DATE, rtrim(:end), 103)
          and ISNULL(fechaegr, '') != ''
          ORDER by fechaegr`,

				Ocupacion: `and ISNULL(fechaegr, '') = '' ORDER by fechaing`,
			}

			const queryString = `
       SELECT
            [epis_pk]
            ,c.cod_cama
            ,c.servicio as 'servicio_cama'
            ,c.estado_cama
            ,CASE
                when isnull(c.censable, 0) = 0 THEN 'NO' 
                else 'SI'
            end as 'censable'
            ,[registro]
            ,[nombres] + ' ' +[apellido1] + ' ' + [apellido2] as nombre
            ,[id_segsoc]
            ,[segsoc]
            ,[fecha_nac]
            ,[Localidad]
            ,[Municipio]
            ,[Estado]
            ,CONVERT(VARCHAR(10), fechaing, 103)   as 'FechaIngreso'
            ,CONVERT(VARCHAR(10), fechaegr, 103)   as 'FechaEgreso'
            ,[numdias]
            ,[hrs]
            ,[cama]
            ,[CIE] + ' - ' + [CIE_DESC] as 'Diagnostico'
            ,[capturo]
            ,i.[servicio]
            ,[meding]
            ,[Fecha_Alta]
            ,[Hora_Alta]
            ,[CIE_ALTA]
            ,[CIE_ALTA] + ' - ' + [CIE_DESC_ALTA] as 'CIE_DESC_ALTA'
            ,[Motivo_alta]
            ,[Destino_alta]
            ,[med_alta]
            ,[sexo] as 'Genero'
            ,[edocivil] as 'EstadoCivil'
            ,[ocupa] as 'Ocupacion'
            ,[escol] as 'Escolaridad'
            ,[Procedencia]
            ,[Proc_urg]
            ,[PISO_DESC]
            ,[division]
            ,[siih]
            ,[ssj]
            ,i.[divi]
            ,c.divi as 'divi_cama'
            ,CASE
                when isnull(i.centro, '') != '' then i.centro
                else c.centro 
            end as 'Centro'
            ,[unidad_enfermeria] as 'UnidadEnfermeria'
            ,[nom_pagador_evento] as 'PagadorEvento'
            ,[ing_tipo_desc]
            ,[servicio_egreso] as 'ServicioEgreso'
            ,CONCAT(
                [edadaños], ' Años ',
                [EdadMeses], ' meses ',
                [EdadDias], ' días'
              ) AS edad
            ,[edadaños]
            ,[EdadMeses]
            ,[EdadDias]
            ,[TURNO_INGRESO] 'TurnoIngreso'
            ,CASE
                      when ISNULL(fechaegr, '') = '' then 'NO'
                      else 'SI'
                    END as 'Egreso'
                    ,(SELECT top 1

                case
                    when isnull(e.rud, '') <> '' then 'MEDICO DE EMPLEADOS'
                    else isnull(d.nombre_garante, 'SIN CLASIFICAR')
                end as nombre_garante

                from hcg_produccion.dbo.hc h
                left join (select *
                    from hcg_his.dbo.INSA_DERECHOHABIENCIA
                    where convert(date, i.fechaing) between dia
                    and convert(date, fech_fin_cove)
                ) d on h.nhc collate database_default = d.nhc collate database_default
                left join hcg_vfp.dbo.medemp_beneficiarios e on h.nhc = e.expediente
                where isnull(h.activa_sn,0) = 1
            and h.nhc=i.registro
                order by d.dia desc) as financiamiento
        FROM [Reportes].[dbo].[vIngresosAdministrativos] i
        RIGHT JOIN Reportes.dbo.vcamas c
        ON i.cama = c.cod_cama
        ${wherQuery[type as keyof typeof wherQuery]}
      `

			const replacements = {
				start,
				end,
			}
			console.time("vIngresosAdministrativos")
			const data = await DataService.read(queryString, replacements)
			console.timeEnd("vIngresosAdministrativos")

			return {
				status: 200,
				message: "Datas read successfully",
				data,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async vCirugias({ query, params }: functionProps) {
		try {
			if (!query) {
				throw new Error("Query is required")
			}
			const { start, end } = query
			const queryString = `
        SELECT
         [centro] as 'Centro'
            ,[Fecha]
            ,[Hora_QX]
            ,[Turno] 
            ,[QX]
            ,[Paciente] as 'Nombre'
            ,[registro]
            ,[FechaNac] as 'fecha_nac'
            ,[nombre_sexo] as 'Genero'
            ,[Diagnostico]
            ,[Cirugia]
            ,[cirujano]
            ,[Radiologo]
            ,[anestesiologo]
            ,[MotivoSuspension]
            ,[servicio] as 'Servicio'
            ,[imprevisto]
            ,[ambulatorio]
            ,[suspendida]
            ,[ci_inter_diagno1] 
            ,[icd_nom_proc_ppal]
            ,[descripcion]
            ,[fechacir] 'FechaCirugia'
            ,[ejercicio]
            ,[registro_reserva]
            ,[rud_reserva]
        FROM [Reportes].[dbo].[vCirugiasProgramadas]
        where convert(DATE, rtrim(Fecha), 103) 
          BETWEEN convert(DATE, rtrim(:start), 103) 
          and convert(DATE, rtrim(:end), 103)
      `

			const replacements = {
				start,
				end,
			}

			console.time("vCirugias")
			const data = await DataService.read(queryString, replacements)
			console.timeEnd("vCirugias")

			return {
				status: 200,
				message: "Datas read successfully",
				data,
			}
		} catch (error) {
			throw new Error(error instanceof Error ? error.message : String(error))
		}
	}

	async vUrgencias({ query, params }: functionProps) {
		try {
			if (!query) {
				throw new Error("Query is required")
			}
			const { start, end } = query
			const queryString = `
        SELECT TOP (1000) 
            [epis_pk]
            ,CONVERT(VARCHAR(10), Fechaing, 103) as 'FechaIngreso'
            ,FORMAT(Fechaing, 'HH:mm', 'es-ES') as 'HoraIngreso'
            ,CONVERT(VARCHAR(10), fechaate, 103) as 'FechaAtendido'
            ,FORMAT(fechaate, 'HH:mm', 'es-ES') as 'HoraAtendido'
            ,CONVERT(VARCHAR(10), fechaegr, 103) as 'FechaEgreso'
            ,FORMAT(fechaegr, 'HH:mm', 'es-ES') as 'HoraEgreso'
            ,[registro]
            ,[nombrecom] as 'Nombre'
            ,[fecha_nac] 
            ,[sexo] as 'Genero'
            ,[estado_residencia] as 'Estado'
            ,[nombre_municipio_residencia] as 'Municipio' 
            ,[nombre_localidad_residencia] as 'Localidad'
            ,[PrimeraVez]
            ,[diag_egr] as 'DiagnosticoEgreso'
            ,[motivo_urg_libre] as 'MotivoUrgenciaLibre'
            ,[NombreMedico]
            ,[nombreresponsable]
            ,[destino_urgencias] as 'DestinoUrgencias'
            ,[procedencia] as 'Procedencia'
            ,[desc_area]
            ,[tipo_urgencia]
            ,[seguridad_social] as 'SeguridadSocial'
            ,[servicio_ingreso] as 'ServicioIngreso'
            ,[entrada_fecha] as 'FechaEntrada'
            ,[salida_fecha] as 'FechaSalida'
            ,[motivo_urgencia] as 'MotivoUrgencia'
            ,[centro] as 'Centro'
            ,[TURNO] as 'Turno'
            ,[PISO_DESC] as 'Piso'
            ,[unidad_enfermeria] as 'UnidadEnfermeria'
            ,[diag_ing] as 'DiagnostivoIngreso'
            ,[nom_pagador_evento] as 'Pagador'
            ,[localizacion] as 'Localizacion'
            ,[usuario_registro]
            ,[categoria_registro]
            ,[atencion_fecha] as 'FechaAtencion'
            ,[edadaños]
            ,[EdadMeses]
            ,[EdadDias]
            ,CASE
              when isnull(nombre_garante, '') = '' then 'SIN CLASIFICAR'
              else nombre_garante
            END as financiamiento
            ,CONCAT(
              [edadaños], ' Años ',
              [EdadMeses], ' meses ',
              [EdadDias], ' días'
            ) AS edad
        FROM [Reportes].[dbo].[vUrgencias] i
        left join (
          SELECT 
              case 
                  when isnull(e.rud, '') <> '' then 10 
                  else isnull(d.CODIGO_GARANTE_PK, 0) 
              END as codigo_garante, 
              case 
                  when isnull(e.rud, '') <> '' then 'MEDICO DE EMPLEADOS' 
                  else isnull(d.nombre_garante, 'SIN CLASIFICAR') 
              end as nombre_garante,
              h.nhc
              from hcg_produccion.dbo.hc h 
              left join (select *
                  from hcg_his.dbo.INSA_DERECHOHABIENCIA
                  where convert(date, getdate()) between dia 
                  and convert(date, fech_fin_cove)
              ) d on h.nhc = d.nhc collate Modern_Spanish_CI_AS 
              left join hcg_vfp.dbo.medemp_beneficiarios e on h.nhc = e.expediente
              where isnull(h.activa_sn,0) = 1
             
        ) as garante 
        on i.registro = garante.nhc 
        where  convert(DATE, rtrim(fechaing), 103) 
          BETWEEN convert(DATE, rtrim(:start), 103) 
          and convert(DATE, rtrim(:end), 103)
      `

			const replacements = {
				start,
				end,
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

	async vProductividad({ query, params }: functionProps) {
		try {
			if (!query) {
				throw new Error("Query is required")
			}
			const { start, end } = query
			const queryString = `
        SELECT
            [fecha]
              ,[centro] as 'Centro'
              ,[serv_bas_desc] as 'Servicio'
              ,[edadaños]
              ,[EdadMeses]
              ,[EdadDias]
              ,[fh_llegada] as 'FechaLlegada'
              ,[fh_entrada] as 'FechaEntrada'
              ,[fh_salida] as 'FechaSalida'
              ,[medico_responsable] as 'Medico'
              ,[agenda] as 'Agenda'
              ,[servicio_agenda] 'ServicioAgenda'
              ,[div]
              ,[nombrecom] as 'Nombre'
              ,[registro]
              ,[fecha_nac] 
              ,[SEXO] as 'Genero'
              ,[estado] as 'Estado'
              ,[municipio] as 'Municipio'
              ,[localidad] as 'Localidad'
              ,[CITAS_AÑO]
              ,[CITAS_SERV_AÑO]
              ,[Tipo_visita] as 'Visita'
              ,[DIAGNOSTICO] as 'Diagnostico'
              ,[estado_cita] as 'EstadoCita'
              ,[TIPO_CITA] as 'TipoCita'
              ,[diagnosticos]
              ,[nom_pagador_evento] as 'Pagador'
              ,[nombre_corto]
              ,[Turno] as 'Turno'
              ,[agenda_efectora]
              ,[prest_item_desc] as 'Cita'
              ,[n_solic]
          FROM [Reportes].[dbo].[vProductividad_cex]
          where convert(DATE, rtrim(fecha), 103) 
            BETWEEN convert(DATE, rtrim(:start), 103) 
            and convert(DATE, rtrim(:end), 103)
          order by fecha desc
      `

			const replacements = {
				start,
				end,
			}
			console.time("vProductividad")
			const data = await DataService.read(queryString, replacements)
			console.timeEnd("vProductividad")

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
			switch (type) {
				case 1:
					result = await this.vCitados({
						query: { start, end },
						params: {},
						body: null,
					})
					break
				case 2:
					result = await this.vIngresosAdministrativos({
						query: { start, end, type: typeReport },
						params: {},
						body: null,
					})
					break
				case 3:
					result = await this.vCirugias({
						query: { start, end },
						params: {},
						body: null,
					})
					break
				case 4:
					result = await this.vUrgencias({
						query: { start, end },
						params: {},
						body: null,
					})
					break
				case 5:
					result = await this.vProductividad({
						query: { start, end },
						params: {},
						body: null,
					})
					break
				default:
					break
			}

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
