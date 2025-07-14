import { Sequelize } from "sequelize"

export function initModels(_: Sequelize) {
	const db = {}

	Object.values(db).forEach((model: any) => {
		if (typeof model?.associate === "function") {
			model.associate(db)
		}
	})

	return db
}

export type DB = ReturnType<typeof initModels>
