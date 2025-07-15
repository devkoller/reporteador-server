import express, { Application, Request, Response } from "express"
import apiV1Routes from "./api/v1/routes" // Importamos el enrutador principal v1
import { requestLogger } from "./middlewares" // Importar middleware
import cors from "cors"
import rateLimit from "express-rate-limit"
import helmet from "helmet"
import fileupload from "express-fileupload"
import bodyParser from "body-parser"
import { environment } from "./config/environment"

// console.log("🚀 > app.ts:5 > _db:", cgi)
class App {
	public app: Application

	constructor() {
		this.app = express()
		this.config()
		this.routes()
	}

	private config(): void {
		// Middlewares esenciales
		this.app.set("trust proxy", 1)
		this.app.use(express.json()) // Para parsear JSON bodies
		this.app.use(express.urlencoded({ extended: true })) // Para parsear URL-encoded bodies

		// Middlewares personalizados (ej: logging)
		this.app.use(requestLogger)

		this.app.use(cors(environment.corsOptions))
		this.app.use(helmet()) // Seguridad HTTP
		// this.app.use(
		// 	rateLimit(environment.limiter) // Limitación de tasa
		// )

		this.app.use(fileupload())

		this.app.use(bodyParser.json())
		this.app.use(
			bodyParser.urlencoded({
				extended: true,
			})
		)
	}

	private routes(): void {
		this.app.get("/", (req: Request, res: Response) => {
			res.send("¡Hola Mundo desde la App!")
		})

		// Usamos el enrutador de la API v1 con su prefijo
		this.app.use("/v1", apiV1Routes)
	}
}

export default new App().app
