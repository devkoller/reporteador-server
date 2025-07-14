import { Sequelize, DataTypes } from "sequelize"
import { environment } from ".."
import { initModels, DB } from "./initModels/produccion.models"

const DATABASE = environment.db.produccion.database
const USER = environment.db.produccion.user
const PASSWORD = environment.db.produccion.password
const HOST = environment.db.host
const DIALECT = environment.db.dialect
const PORT = environment.db.port

// Instancia de Sequelize
const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
	host: HOST,
	port: PORT as number,
	dialect: DIALECT as any,
	logging: false,
	timezone: "-06:00",
	pool: { max: 10, min: 0, acquire: 60000, idle: 10000 },
	dialectOptions: {
		options: {
			requestTimeout: 60000,
			encrypt: false, // ← desactiva TLS/SNI
			trustServerCertificate: true, // ← evita errores de certificado
		},
	},
})
// Inicializa todos los modelos
const db: DB & { sequelize: Sequelize; Sequelize: typeof Sequelize } = {
	...initModels(sequelize),
	sequelize,
	Sequelize,
}

export default db
