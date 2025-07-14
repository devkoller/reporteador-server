import "module-alias/register"
import dotenv from "dotenv"
import cron from "node-cron"
import dataController from "./modules/data/data.controller"
import Mailer from "./core/utils/Mailer"
dotenv.config()

import app from "./app"
import { environment, cgi } from "@/config"

// cron.schedule("0 8 * * *", async () => {
// 	let body = {
// 		columns: [
// 			{ accessorKey: "cod_cama", header: "Cama" },
// 			{ accessorKey: "registro", header: "Registro" },
// 			{ accessorKey: "nombre", header: "Paciente" },
// 			{ accessorKey: "fecha_nac", header: "Fecha de Nacimiento" },
// 			{ accessorKey: "FechaIngreso", header: "Fecha de ingreso" },
// 			{ accessorKey: "TurnoIngreso", header: "Turno de ingreso" },
// 			{ accessorKey: "Centro", header: "Centro" },
// 			{ accessorKey: "servicio", header: "Servicio de ingreso" },
// 			{ accessorKey: "servicio_cama", header: "Servicio de cama" },
// 			{ accessorKey: "estado_cama", header: "Estado de la cama" },
// 			{ accessorKey: "censable", header: "Censable" },
// 			{ accessorKey: "financiamiento", header: "Financiamiento" },
// 		],
// 		title: "Ocupación hospitalaria",
// 		type: 2,
// 		typeReport: "Ocupacion",
// 		start: "16/05/2025",
// 		end: "19/05/2025",
// 		filters: {
// 			filters: {
// 				Centro: { include: ["FAA"], exclude: [] },
// 			},
// 			searchFilters: {},
// 			filterableKeys: [
// 				"CIE_ALTA",
// 				"CIE_DESC_ALTA",
// 				"Centro",
// 				"Destino_alta",
// 				"Diagnostico",
// 				"Escolaridad",
// 				"Estado",
// 				"EstadoCivil",
// 				"FechaEgreso",
// 				"FechaIngreso",
// 				"Fecha_Alta",
// 				"Genero",
// 				"Hora_Alta",
// 				"Localidad",
// 				"Motivo_alta",
// 				"Municipio",
// 				"Ocupacion",
// 				"PISO_DESC",
// 				"PagadorEvento",
// 				"Proc_urg",
// 				"Procedencia",
// 				"ServicioEgreso",
// 				"TurnoIngreso",
// 				"UnidadEnfermeria",
// 				"cama",
// 				"capturo",
// 				"divi",
// 				"division",
// 				"fecha_nac",
// 				"hrs",
// 				"ing_tipo_desc",
// 				"med_alta",
// 				"meding",
// 				"nombre",
// 				"numdias",
// 				"registro",
// 				"segsoc",
// 				"servicio",
// 				"Egreso",
// 				"AgeGroup",
// 				"financiamiento",
// 				"estado_cama",
// 			],
// 		},
// 		charts: [
// 			{
// 				type: "pie",
// 				key: "estado_cama",
// 				title: "Ocupación hospitalaria",
// 			},
// 			{ type: "pie", key: "financiamiento", title: "Financiamiento" },
// 			{
// 				type: "bar",
// 				key: "servicio",
// 				title: "Servicios",
// 				css: "col-span-2",
// 			},
// 		],
// 	}
// 	let results = await dataController.pdfReport({
// 		query: {},
// 		params: {},
// 		body,
// 	})

// 	const from = process.env.EMAIL_USER

// 	const destinatarios = [
// 		"julio.mariscal@hcg.gob.mx",
// 		"rcvazquez@hcg.gob.mx",
// 		"rosaimeldahernandezramirez@hcg.gob.mx",
// 		"rduran@hcg.gob.mx",
// 	]

// 	const emailOptions = {
// 		from: `NO REPLY <${from}>`,
// 		to: destinatarios.join(","),
// 		subject: "REPORTE: Ocupación hospitalaria",
// 		html: "",
// 		attachments: [
// 			{
// 				filename: "reporte.pdf",
// 				content: results.data.pdf,
// 				encoding: "base64",
// 				contentType: "application/pdf",
// 			},
// 			{
// 				filename: "reporte.xlsx",
// 				content: results.data.excel,
// 				encoding: "base64",
// 				contentType:
// 					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
// 			},
// 		],
// 	}

// 	await Mailer.sendEmail(emailOptions)
// })

app.listen(environment.port, () => {
	console.log(`Server is running on port ${environment.port}`)
	console.log(
		`Environment: ${environment.production ? "Production" : "Development"}`
	)
	// console.log(`Database: ${environment.db.host}:${environment.db.port}`)
})
