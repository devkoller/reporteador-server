import { Router } from "express"
import { Request, Response } from "express"
import { callback } from "@/core"
import Data from "./data.controller"

const router = Router()

router.get("/vCitados", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: Data.vCitados,
	})
})

router.get(
	"/vIngresosAdministrativos",
	[],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Data.vIngresosAdministrativos,
		})
	}
)

router.get("/vCirugias", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: Data.vCirugias,
	})
})

router.get("/vUrgencias", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: Data.vUrgencias,
	})
})

router.get("/vProductividad", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: Data.vProductividad,
	})
})

router.get("/vPenalizaTodos", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: Data.vPenalizaTodos,
	})
})

router.get("/vIncumplimientos", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: Data.vIncumplimientos,
	})
})

router.post("/report/pdf", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: Data.pdfReport,
	})
})

export default router
