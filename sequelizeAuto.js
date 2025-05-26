const SequelizeAuto = require("sequelize-auto")
require("dotenv").config()

const table = process.argv[2]
if (!table) {
	console.error("❌  Dame el nombre de la tabla: `node gen-model.js User`")
	process.exit(1)
}

// 1) Genera tu modelo en un folder temporal
const tmpDir = "./src/modules"

const auto = new SequelizeAuto(
	process.env.DB_NAME_CGI,
	process.env.DB_USER_CGI,
	process.env.DB_PASSWORD_CGI,
	{
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
		port: process.env.DB_PORT,
		directory: tmpDir, // donde se guardan los modelos
		tables: [table],
		lang: "ts",
		noInitModels: true, // que sí genere init-models.js
		dialectOptions: {
			options: {
				encrypt: false, // ← desactiva TLS/SNI
				trustServerCertificate: true, // ← evita errores de certificado
			},
		},
	}
)

auto.run()
