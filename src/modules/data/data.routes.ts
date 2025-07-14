import { Router } from "express"
import { Request, Response } from "express"
import { callback } from "@/core"
import Data from "./data.controller"

import { auth } from "@/middlewares/"

const router = Router()

router.get(
	"/vCitados",
	[auth.verifyToken, auth.authorizeRouteAccess],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.vCitados,
		})
	}
)

router.get(
	"/vIngresosAdministrativos",
	[auth.verifyToken, auth.authorizeRouteAccess],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.vIngresosAdministrativos,
		})
	}
)

router.get(
	"/vCirugias",
	[auth.verifyToken, auth.authorizeRouteAccess],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.vCirugias,
		})
	}
)

router.get(
	"/vUrgencias",
	[auth.verifyToken, auth.authorizeRouteAccess],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.vUrgencias,
		})
	}
)

router.get(
	"/vProductividad",
	[auth.verifyToken, auth.authorizeRouteAccess],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.vProductividad,
		})
	}
)

router.get(
	"/vPenalizaTodos",
	[auth.verifyToken, auth.authorizeRouteAccess],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.vPenalizaTodos,
		})
	}
)

router.get(
	"/vIncumplimientos",
	[auth.verifyToken, auth.authorizeRouteAccess],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.vIncumplimientos,
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
