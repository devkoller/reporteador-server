import { Request, Response } from "express"
import dotenv from "dotenv"
dotenv.config()

const whiteList = process.env.CORS_WHITELIST
	? process.env.CORS_WHITELIST.split(",").map((url) => url.trim())
	: []

const whitelistCIDRs = process.env.RATE_LIMIT_WHITELIST
	? process.env.RATE_LIMIT_WHITELIST.split(",").map((cidr) => cidr.trim())
	: []

const isDevelopment = process.env.NODE_ENV !== "production"

export const environment = {
	production: process.env.NODE_ENV === "production",
	port: process.env.PORT || 3000,
	db: {
		host: process.env.DB_HOST || "localhost",
		dialect: process.env.DB_DIALECT || "mssql",
		port: process.env.DB_PORT || 5432,
		produccion: {
			database: process.env.DB_NAME_PRODUCCION || "database",
			user: process.env.DB_USER_PRODUCCION || "user",
			password: process.env.DB_PASSWORD_PRODUCCION || "password",
		},
		cgi: {
			database: process.env.DB_NAME_CGI || "database",
			user: process.env.DB_USER_CGI || "user",
			password: process.env.DB_PASSWORD_CGI || "password",
		},
		his: {
			database: process.env.DB_NAME_HIS || "database",
			user: process.env.DB_USER_HIS || "user",
			password: process.env.DB_PASSWORD_CGI || "password",
		},
		sigma: {
			database: process.env.DB_NAME_SIGMA || "database",
			user: process.env.DB_USER_SIGMA || "user",
			password: process.env.DB_PASSWORD_SIGMA || "password",
		},
	},
	jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
	corsOptions: {
		origin: function (origin: any, callback: any) {
			// Permitir solicitudes desde localhost y dominios específicos si estamos en desarrollo
			if (isDevelopment) {
				return callback(null, origin || true)
			}

			// Bloquear solicitudes sin origen (como las de Postman)
			// o desde dominios no permitidos
			if (!origin) {
				callback(new Error("No autorizado por CORS"))
			}

			if (whiteList.includes(origin)) {
				callback(null, true)
			} else {
				callback(new Error("No autorizado por CORS"))
			}
		},
		methods: "GET,PUT,PATCH,POST,DELETE",
		credentials: true,
		optionsSuccessStatus: 200,
	},
	limiter: {
		windowMs: 15 * 60 * 1000, // 15 minutos
		max: 300, // máximo 300 requests por IP
		skip: (req: Request, res: Response) => {
			const ip = req.ip || ""
			return whitelistCIDRs.includes(ip)
		},
	},
}
