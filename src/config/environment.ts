import dotenv from "dotenv"
dotenv.config()

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
	apiUrl: process.env.API_URL || "http://localhost:3000/api",
	clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
}
