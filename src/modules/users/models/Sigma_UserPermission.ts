import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"
import type { Sigma_Permission, Sigma_PermissionId } from "./Sigma_Permission"
import type { Sigma_User, Sigma_UserId } from "./Sigma_User"

export interface Sigma_UserPermissionAttributes {
	id: number
	userID?: number
	permissionID?: number
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
}

export type Sigma_UserPermissionPk = "id"
export type Sigma_UserPermissionId =
	Sigma_UserPermission[Sigma_UserPermissionPk]
export type Sigma_UserPermissionOptionalAttributes =
	| "id"
	| "userID"
	| "permissionID"
	| "createdAt"
	| "updatedAt"
	| "deletedAt"
export type Sigma_UserPermissionCreationAttributes = Optional<
	Sigma_UserPermissionAttributes,
	Sigma_UserPermissionOptionalAttributes
>

export class Sigma_UserPermission
	extends Model<
		Sigma_UserPermissionAttributes,
		Sigma_UserPermissionCreationAttributes
	>
	implements Sigma_UserPermissionAttributes
{
	id!: number
	userID?: number
	permissionID?: number
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date

	// Sigma_UserPermission belongsTo Sigma_Permission via permissionID
	permission!: Sigma_Permission
	getPermission!: Sequelize.BelongsToGetAssociationMixin<Sigma_Permission>
	setPermission!: Sequelize.BelongsToSetAssociationMixin<
		Sigma_Permission,
		Sigma_PermissionId
	>
	createPermission!: Sequelize.BelongsToCreateAssociationMixin<Sigma_Permission>
	// Sigma_UserPermission belongsTo Sigma_User via userID
	user!: Sigma_User
	getUser!: Sequelize.BelongsToGetAssociationMixin<Sigma_User>
	setUser!: Sequelize.BelongsToSetAssociationMixin<Sigma_User, Sigma_UserId>
	createUser!: Sequelize.BelongsToCreateAssociationMixin<Sigma_User>

	static initModel(
		sequelize: Sequelize.Sequelize
	): typeof Sigma_UserPermission {
		return Sigma_UserPermission.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
				},
				userID: {
					type: DataTypes.INTEGER,
					allowNull: true,
					references: {
						model: "Sigma_User",
						key: "id",
					},
				},
				permissionID: {
					type: DataTypes.INTEGER,
					allowNull: true,
					// references: {
					// 	model: "Sigma_Permission",
					// 	key: "id",
					// },
				},
			},
			{
				sequelize,
				tableName: "Sigma_UserPermission",
				schema: "dbo",
				timestamps: true,
				paranoid: true,
				indexes: [
					{
						name: "PK__Sigma_Us__3213E83F30CE3DAD",
						unique: true,
						fields: [{ name: "id" }],
					},
				],
			}
		)
	}

	static associate(models: any): void {
		Sigma_UserPermission.belongsTo(models.Sigma_Permission, {
			as: "Permission",
			foreignKey: "permissionID",
		})
	}
}
