import { Sequelize } from "sequelize"

import { statistisPanels } from "../statistics/panels/panels/statistisPanels.model"
import { panelsCharts } from "../statistics/panels/charts/panelsCharts.model"
import { panelsTabs } from "../statistics/panels/tabs/panelsTabs.model"

import { User } from "../users/models/User.model"
import { Person } from "../users/models/Person.model"
import { UserOtp } from "../users/models/UserOtp.model"
import { UserRole } from "../users/models/UserRole.model"

import { Permission } from "../permissions/models/Permission.model"
import { Role } from "../permissions/models/Role.model"
import { RolePermission } from "../permissions/models/RolePermission.model"

export function initModels(sequelize: Sequelize) {
	const db = {
		statistisPanels: statistisPanels.initModel(sequelize),
		panelsCharts: panelsCharts.initModel(sequelize),
		panelsTabs: panelsTabs.initModel(sequelize),

		User: User.initModel(sequelize),
		Person: Person.initModel(sequelize),
		UserOtp: UserOtp.initModel(sequelize),
		UserRole: UserRole.initModel(sequelize),

		Permission: Permission.initModel(sequelize),
		Role: Role.initModel(sequelize),
		RolePermission: RolePermission.initModel(sequelize),
	}

	Object.values(db).forEach((model: any) => {
		if (typeof model?.associate === "function") {
			model.associate(db)
		}
	})

	return db
}

export type DB = ReturnType<typeof initModels>
