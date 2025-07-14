import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"
import type { Sigma_Resource, Sigma_ResourceId } from "./Sigma_Resource"

export interface Sigma_PermissionAttributes {
	id: number
	resourceID: number
	parent?: number
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
}

export type Sigma_PermissionPk = "id"
export type Sigma_PermissionId = Sigma_Permission[Sigma_PermissionPk]
export type Sigma_PermissionOptionalAttributes =
	| "id"
	| "parent"
	| "createdAt"
	| "updatedAt"
	| "deletedAt"
export type Sigma_PermissionCreationAttributes = Optional<
	Sigma_PermissionAttributes,
	Sigma_PermissionOptionalAttributes
>

export class Sigma_Permission
	extends Model<Sigma_PermissionAttributes, Sigma_PermissionCreationAttributes>
	implements Sigma_PermissionAttributes
{
	id!: number
	resourceID!: number
	name?: string
	description?: string
	parent?: number
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date

	// Sigma_Permission belongsTo Sigma_Resource via resourceID
	resource!: Sigma_Resource
	getResource!: Sequelize.BelongsToGetAssociationMixin<Sigma_Resource>
	setResource!: Sequelize.BelongsToSetAssociationMixin<
		Sigma_Resource,
		Sigma_ResourceId
	>
	createResource!: Sequelize.BelongsToCreateAssociationMixin<Sigma_Resource>

	static initModel(sequelize: Sequelize.Sequelize): typeof Sigma_Permission {
		return Sigma_Permission.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
				},
				resourceID: {
					type: DataTypes.INTEGER,
					allowNull: false,
					references: {
						model: "Sigma_Resource",
						key: "id",
					},
				},
				parent: {
					type: DataTypes.INTEGER,
					allowNull: true,
					defaultValue: 0,
				},
			},
			{
				sequelize,
				tableName: "Sigma_Permission",
				schema: "dbo",
				timestamps: true,
				paranoid: true,
				indexes: [
					{
						name: "PK__Sigma_Pe__3213E83FB2148449",
						unique: true,
						fields: [{ name: "id" }],
					},
				],
			}
		)
	}

	static associate(models: any): void {
		Sigma_Permission.hasMany(models.Sigma_RolePermission, {
			as: "RolePermissions",
			foreignKey: "permissionID",
			sourceKey: "id",
		})

		Sigma_Permission.belongsTo(models.Sigma_Resource, {
			as: "Resource",
			foreignKey: "resourceID",
		})

		Sigma_Permission.hasMany(models.Sigma_UserPermission, {
			foreignKey: "permissionID",
			as: "UserPermissions",
		})

		// Sigma_Permission.hasMany(models.Sigma_UserPermission, {
		// 	as: "Permission",
		// 	foreignKey: "permissionID",
		// 	sourceKey: "id",
		// })
	}
}
