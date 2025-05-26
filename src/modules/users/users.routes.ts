import { Router } from "express"
import { Request, Response } from "express"
import { callback } from "@/core"
import User from "./users.controller"

const router = Router()

router.get("/", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: User.readAll,
	})
})

router.get("/me", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: User.readMe,
	})
})

router.post("/signup", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: User.create,
	})
})

router.post("/login", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: User.login,
	})
})

router.put("/assign-role", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: User.assignRoles,
	})
})

router.put("/remove-role", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: User.removeRole,
	})
})

router.put("/assign-permission", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: User.assignPermissions,
	})
})

router.put("/remove-permission", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: User.removePermission,
	})
})

export default router
