import { Router } from "express"
import { Request, Response } from "express"
import { callback } from "@/core"
import Panels from "./panels.controller"

const router = Router()

router.get("/", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: Panels.readAll,
	})
})

router.get("/:id", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: Panels.readOne,
	})
})

router.get(
	"/get-info-panel/:id",
	[],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: Panels.readInfoPanel,
		})
	}
)

router.post("/", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: Panels.create,
	})
})

router.put("/", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: Panels.update,
	})
})

router.patch("/", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: Panels.update,
	})
})

router.delete("/", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: Panels.delete,
	})
})

export default router
