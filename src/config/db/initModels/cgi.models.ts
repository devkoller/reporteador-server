import { Sequelize } from "sequelize"

import { statistisPanels } from "../../../modules/statistics/panels/panels/statistisPanels.model"
import { panelsCharts } from "../../../modules/statistics/panels/charts/panelsCharts.model"
import { panelsTabs } from "../../../modules/statistics/panels/tabs/panelsTabs.model"

import {
	Sigma_Center,
	Sigma_PasswordHistory,
	Sigma_Permission,
	Sigma_Person,
	Sigma_Resource,
	Sigma_Role,
	Sigma_RolePermission,
	Sigma_TypePermission,
	Sigma_User,
	Sigma_UserCenter,
	Sigma_UserPermission,
	Sigma_UserRole,
	Sigma_UserSession,
} from "@/modules/users"

import { Permission } from "../../../modules/permissions/models/Permission.model"
import { Role } from "../../../modules/permissions/models/Role.model"
import { RolePermission } from "../../../modules/permissions/models/RolePermission.model"

export function initModels(sequelize: Sequelize) {
	const db = {
		statistisPanels: statistisPanels.initModel(sequelize),
		panelsCharts: panelsCharts.initModel(sequelize),
		panelsTabs: panelsTabs.initModel(sequelize),

		Sigma_Center: Sigma_Center.initModel(sequelize),
		Sigma_PasswordHistory: Sigma_PasswordHistory.initModel(sequelize),
		Sigma_Permission: Sigma_Permission.initModel(sequelize),
		Sigma_Person: Sigma_Person.initModel(sequelize),
		Sigma_Resource: Sigma_Resource.initModel(sequelize),
		Sigma_Role: Sigma_Role.initModel(sequelize),
		Sigma_RolePermission: Sigma_RolePermission.initModel(sequelize),
		Sigma_TypePermission: Sigma_TypePermission.initModel(sequelize),
		Sigma_User: Sigma_User.initModel(sequelize),
		Sigma_UserCenter: Sigma_UserCenter.initModel(sequelize),
		Sigma_UserPermission: Sigma_UserPermission.initModel(sequelize),
		Sigma_UserRole: Sigma_UserRole.initModel(sequelize),
		Sigma_UserSession: Sigma_UserSession.initModel(sequelize),

		Permission: Permission.initModel(sequelize),
		Role: Role.initModel(sequelize),
		RolePermission: RolePermission.initModel(sequelize),
	}

	Object.entries(db).forEach(([key, model]: [string, any]) => {
		if (typeof model?.associate === "function") {
			console.log("Associating model:", key)
			model.associate(db)
		}
	})

	return db
}

export type DB = ReturnType<typeof initModels>
