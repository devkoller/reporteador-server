import { Sequelize } from "sequelize"
import { environment } from ".."
import { initModels, DB } from "./initModels/cgi.models"

const DATABASE = environment.db.cgi.database
const USER = environment.db.cgi.user
const PASSWORD = environment.db.cgi.password
const HOST = environment.db.host
const DIALECT = environment.db.dialect
const PORT = environment.db.port

// Instancia de Sequelize
const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
	host: HOST,
	port: PORT as number,
	dialect: DIALECT as any,
	logging: false,
	pool: { max: 10, min: 0, acquire: 60000, idle: 10000 },
	dialectOptions: {
		options: {
			useUTC: false,
			timezone: "GMT-06:00",
			enableArithAbort: true, // ← evita errores de conexión
			dateFirst: 1,
			requestTimeout: 60000,
			encrypt: false, // ← desactiva TLS/SNI
			trustServerCertificate: true, // ← evita errores de certificado
		},
	},
	timezone: "GMT-06:00",
})

// Inicializa todos los modelos
const db: DB & { sequelize: Sequelize; Sequelize: typeof Sequelize } = {
	...initModels(sequelize),
	sequelize,
	Sequelize,
}

export default db
