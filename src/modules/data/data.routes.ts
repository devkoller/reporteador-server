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

router.post(
	"/contracts",
	[auth.verifyToken, auth.authorizeRouteAccess],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.vContratos_adquisiciones,
		})
	}
)

router.get(
	"/orders",
	[auth.verifyToken, auth.authorizeRouteAccess],
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
	[auth.verifyToken, auth.authorizeRouteAccess],
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
