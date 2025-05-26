import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"
import type { Permission, PermissionId } from "./Permission.model"
import type { Role, RoleId } from "./Role.model"

export interface RolePermissionAttributes {
	roleID: number
	permissionID: number
}

export type RolePermissionPk = "roleID" | "permissionID"
export type RolePermissionId = RolePermission[RolePermissionPk]
export type RolePermissionCreationAttributes = RolePermissionAttributes

export class RolePermission
	extends Model<RolePermissionAttributes, RolePermissionCreationAttributes>
	implements RolePermissionAttributes
{
	roleID!: number
	permissionID!: number

	// RolePermission belongsTo Permission via permissionID
	permission!: Permission
	getPermission!: Sequelize.BelongsToGetAssociationMixin<Permission>
	setPermission!: Sequelize.BelongsToSetAssociationMixin<
		Permission,
		PermissionId
	>
	createPermission!: Sequelize.BelongsToCreateAssociationMixin<Permission>
	// RolePermission belongsTo Role via roleID
	role!: Role
	getRole!: Sequelize.BelongsToGetAssociationMixin<Role>
	setRole!: Sequelize.BelongsToSetAssociationMixin<Role, RoleId>
	createRole!: Sequelize.BelongsToCreateAssociationMixin<Role>

	static initModel(sequelize: Sequelize.Sequelize): typeof RolePermission {
		return RolePermission.init(
			{
				roleID: {
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
					references: {
						model: "Role",
						key: "id",
					},
				},
				permissionID: {
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
					references: {
						model: "Permission",
						key: "id",
					},
				},
			},
			{
				sequelize,
				tableName: "RolePermission",
				schema: "dbo",
				timestamps: false,
				indexes: [
					{
						name: "pk_RolePermission",
						unique: true,
						fields: [{ name: "roleID" }, { name: "permissionID" }],
					},
				],
			}
		)
	}
}
