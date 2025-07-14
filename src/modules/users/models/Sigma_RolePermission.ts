import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"
import type { Sigma_Permission, Sigma_PermissionId } from "./Sigma_Permission"
import type { Sigma_Role, Sigma_RoleId } from "./Sigma_Role"

export interface Sigma_RolePermissionAttributes {
	id: number
	roleID?: number
	permissionID?: number
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
}

export type Sigma_RolePermissionPk = "id"
export type Sigma_RolePermissionId =
	Sigma_RolePermission[Sigma_RolePermissionPk]
export type Sigma_RolePermissionOptionalAttributes =
	| "id"
	| "roleID"
	| "permissionID"
	| "createdAt"
	| "updatedAt"
	| "deletedAt"
export type Sigma_RolePermissionCreationAttributes = Optional<
	Sigma_RolePermissionAttributes,
	Sigma_RolePermissionOptionalAttributes
>

export class Sigma_RolePermission
	extends Model<
		Sigma_RolePermissionAttributes,
		Sigma_RolePermissionCreationAttributes
	>
	implements Sigma_RolePermissionAttributes
{
	id!: number
	roleID?: number
	permissionID?: number
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date

	// Sigma_RolePermission belongsTo Sigma_Permission via permissionID
	permission!: Sigma_Permission
	getPermission!: Sequelize.BelongsToGetAssociationMixin<Sigma_Permission>
	setPermission!: Sequelize.BelongsToSetAssociationMixin<
		Sigma_Permission,
		Sigma_PermissionId
	>
	createPermission!: Sequelize.BelongsToCreateAssociationMixin<Sigma_Permission>
	// Sigma_RolePermission belongsTo Sigma_Role via roleID
	role!: Sigma_Role
	getRole!: Sequelize.BelongsToGetAssociationMixin<Sigma_Role>
	setRole!: Sequelize.BelongsToSetAssociationMixin<Sigma_Role, Sigma_RoleId>
	createRole!: Sequelize.BelongsToCreateAssociationMixin<Sigma_Role>

	static initModel(
		sequelize: Sequelize.Sequelize
	): typeof Sigma_RolePermission {
		return Sigma_RolePermission.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
				},
				roleID: {
					type: DataTypes.INTEGER,
					allowNull: true,
					references: {
						model: "Sigma_Role",
						key: "id",
					},
				},
				permissionID: {
					type: DataTypes.INTEGER,
					allowNull: true,
					references: {
						model: "Sigma_Permission",
						key: "id",
					},
				},
			},
			{
				sequelize,
				tableName: "Sigma_RolePermission",
				schema: "dbo",
				timestamps: true,
				paranoid: true,
				indexes: [
					{
						name: "PK__Sigma_Ro__3213E83FC4342841",
						unique: true,
						fields: [{ name: "id" }],
					},
				],
			}
		)
	}

	static associate(models: any): void {
		Sigma_RolePermission.hasMany(models.Sigma_UserRole, {
			as: "userRole",
			foreignKey: "roleID",
			sourceKey: "roleID",
		})

		Sigma_RolePermission.belongsTo(models.Sigma_Permission, {
			foreignKey: "permissionID",
		})
	}
}
