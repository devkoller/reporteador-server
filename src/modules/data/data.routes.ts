import { Router } from "express"
import { Request, Response } from "express"
import { callback } from "@/core"
import Data from "./data.controller"

import { auth } from "@/middlewares/"

const router = Router()

router.get(
	"/licitaciones",
	[auth.verifyToken],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.getNumLicitacion,
		})
	}
)

router.get(
	"/articulos",
	[auth.verifyToken],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.getCodArticulo,
		})
	}
)

router.get(
	"/proveedores",
	[auth.verifyToken],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.getNumProv,
		})
	}
)

router.get(
	"/ejercicios",
	[auth.verifyToken],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.getEjercicio,
		})
	}
)

router.get(
	"/order/licitaciones",
	[auth.verifyToken],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.getOrderNumLicitacion,
		})
	}
)

router.get(
	"/order/articulos",
	[auth.verifyToken],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.getOrderCodArticulo,
		})
	}
)

router.get(
	"/order/proveedores",
	[auth.verifyToken],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.getOrderProveedores,
		})
	}
)

router.get(
	"/order/ejercicios",
	[auth.verifyToken],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.getOrderEjercicio,
		})
	}
)

router.post(
	"/contracts",
	[auth.verifyToken],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.vContratos_adquisiciones,
		})
	}
)

router.post(
	"/orders",
	[auth.verifyToken],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.vOrdenes_compra,
		})
	}
)

router.get(
	"/sufficiencies",
	[auth.verifyToken],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.vSuficiencia,
		})
	}
)

router.post("/report/pdf", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: Data.pdfReport,
	})
})

export default router
