import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import { Op } from "sequelize"

import UserSession from "@/modules/users/services/UserSession.service"
import Resource from "@/modules/users/services/Resource.service"
import Permissions from "@/modules/users/services/Permissions.service"
import UserPermissions from "@/modules/users/services/UserPermission.service"

class Auth {
	constructor() {
		this.verifyToken = this.verifyToken.bind(this)
		this.authorizeRouteAccess = this.authorizeRouteAccess.bind(this)
	}

	async verifyToken(request: Request, response: Response, next: NextFunction) {
		try {
			const token = request.headers.authorization?.split(" ")[1]

			if (!token) {
				throw new Error("No token provided")
			}

			const JWT_SECRET = process.env.TOKEN_KEY || "TOKEN_KEY"

			const decoded = verify(token, JWT_SECRET)

			if (typeof decoded === "string" || !("id" in decoded)) {
				throw new Error("Invalid token payload")
			}

			const session = await UserSession.read({
				where: {
					token,
					userID: decoded.id,
					expiration: { [Op.gt]: new Date() },
				},
			})

			if (!session) {
				throw new Error("Session not found or expired")
			}

			;(request as any).auth = decoded
			next()
		} catch (error) {
			console.log("🚀 > auth.ts:243 > auth > verifyToken > error:", error)
			response.status(401).send({
				status: 401,
				auth: false,
				message: "Failed to authenticate token",
			})
		}
	}

	async authorizeRouteAccess(
		request: Request,
		response: Response,
		next: NextFunction
	) {
		try {
			const { id: userID } = (request as any).auth || {}
			const requestPath = request.originalUrl.split("?")[0]
			const requestMethod = request.method
			const recursoClave = `${requestMethod} ${requestPath}`

			// Busca el recurso
			const resource = await Resource.read({
				where: { backendResource: recursoClave }, // 1 = backend
			})

			if (!resource) {
				throw new Error("Resource not found")
			}

			const permisosPorRol = await Permissions.read({
				where: {
					resourceID: resource.id,
					userID: userID,
				},
			})

			const permisosDirectos = await UserPermissions.read({
				where: {
					userID: userID,
					resourceID: resource.id,
				},
			})

			if (!permisosPorRol && !permisosDirectos) {
				throw new Error("User does not have permission for this resource")
			}

			next()
		} catch (error) {
			console.log("🚀 > auth.middleware.ts:118 > Auth > error:", error)
			response.status(401).send({
				status: 401,
				auth: false,
				message: error,
			})
		}
	}
}

export default new Auth()
