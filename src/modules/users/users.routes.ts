import { Router } from "express"
import { Request, Response } from "express"
import { callback } from "@/core"

import User from "./users.controller"
import { auth } from "@/middlewares/"

const router = Router()

router.get("/", [auth.verifyToken], (request: Request, response: Response) => {
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

router.post(
	"/refresh-token",
	[auth.verifyToken],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: User.refreshToken,
		})
	}
)

router.put("/assign-role", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: User.assignRoles,
	})
})

router.put("/assign-permission", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: User.assignPermissions,
	})
})

router.put("/assign-centers", [], (request: Request, response: Response) => {
	callback({
		request,
		response,
		callback: User.assignCenter,
	})
})

router.get(
	"/centers",
	[auth.verifyToken],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: User.readCenters,
		})
	}
)

router.get(
	"/permissions",
	[auth.verifyToken],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: User.readPermissions,
		})
	}
)

router.post(
	"/read-user-permissions",
	[auth.verifyToken],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: User.readUserPermissions,
		})
	}
)

router.post(
	"/read-user-centers",
	[auth.verifyToken],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: User.readUserCenters,
		})
	}
)

router.post(
	"/refresh-permissions",
	[auth.verifyToken],
	(request: Request, response: Response) => {
		callback({
			request,
			response,
			callback: User.refreshPermissions,
		})
	}
)

export default router
