import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"

export interface PermissionAttributes {
	id: number
	code: string
	name: string
	description?: string
	groupName?: string
	subGroup?: string
	httpMethod?: string
	apiPath?: string
	frontendPath?: string
	menuLabel?: string
	menuIcon?: string
}

export type PermissionPk = "id"
export type PermissionId = Permission[PermissionPk]
export type PermissionOptionalAttributes =
	| "id"
	| "description"
	| "groupName"
	| "subGroup"
	| "httpMethod"
	| "apiPath"
	| "frontendPath"
	| "menuLabel"
	| "menuIcon"
export type PermissionCreationAttributes = Optional<
	PermissionAttributes,
	PermissionOptionalAttributes
>

export class Permission
	extends Model<PermissionAttributes, PermissionCreationAttributes>
	implements PermissionAttributes
{
	id!: number
	code!: string
	name!: string
	description?: string
	groupName?: string
	subGroup?: string
	httpMethod?: string
	apiPath?: string
	frontendPath?: string
	menuLabel?: string
	menuIcon?: string
	createdAt!: Date
	updatedAt!: Date
	deletedAt?: Date

	static initModel(sequelize: Sequelize.Sequelize): typeof Permission {
		return Permission.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
				},
				code: {
					type: DataTypes.STRING(100),
					allowNull: false,
					unique: "UQ__Permissi__357D4CF936CEA5D5",
				},
				name: {
					type: DataTypes.STRING(100),
					allowNull: false,
				},
				description: {
					type: DataTypes.STRING(255),
					allowNull: true,
				},
				groupName: {
					type: DataTypes.STRING(50),
					allowNull: true,
				},
				subGroup: {
					type: DataTypes.STRING(50),
					allowNull: true,
				},
				httpMethod: {
					type: DataTypes.STRING(10),
					allowNull: true,
				},
				apiPath: {
					type: DataTypes.STRING(255),
					allowNull: true,
				},
				frontendPath: {
					type: DataTypes.STRING(255),
					allowNull: true,
				},
				menuLabel: {
					type: DataTypes.STRING(50),
					allowNull: true,
				},
				menuIcon: {
					type: DataTypes.STRING(50),
					allowNull: true,
				},
			},
			{
				sequelize,
				tableName: "Permission",
				schema: "dbo",
				timestamps: true,
				paranoid: true,
				indexes: [
					{
						name: "PK__Permissi__3213E83FE1E77AC1",
						unique: true,
						fields: [{ name: "id" }],
					},
					{
						name: "UQ__Permissi__357D4CF936CEA5D5",
						unique: true,
						fields: [{ name: "code" }],
					},
				],
			}
		)
	}
}
