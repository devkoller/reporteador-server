import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"
import type { Sigma_Role, Sigma_RoleId } from "./Sigma_Role"
import type { Sigma_User, Sigma_UserId } from "./Sigma_User"

export interface Sigma_UserRoleAttributes {
	id: number
	userID?: number
	roleID?: number
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
}

export type Sigma_UserRolePk = "id"
export type Sigma_UserRoleId = Sigma_UserRole[Sigma_UserRolePk]
export type Sigma_UserRoleOptionalAttributes =
	| "id"
	| "userID"
	| "roleID"
	| "createdAt"
	| "updatedAt"
	| "deletedAt"
export type Sigma_UserRoleCreationAttributes = Optional<
	Sigma_UserRoleAttributes,
	Sigma_UserRoleOptionalAttributes
>

export class Sigma_UserRole
	extends Model<Sigma_UserRoleAttributes, Sigma_UserRoleCreationAttributes>
	implements Sigma_UserRoleAttributes
{
	id!: number
	userID?: number
	roleID?: number
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date

	// Sigma_UserRole belongsTo Sigma_Role via roleID
	role!: Sigma_Role
	getRole!: Sequelize.BelongsToGetAssociationMixin<Sigma_Role>
	setRole!: Sequelize.BelongsToSetAssociationMixin<Sigma_Role, Sigma_RoleId>
	createRole!: Sequelize.BelongsToCreateAssociationMixin<Sigma_Role>
	// Sigma_UserRole belongsTo Sigma_User via userID
	user!: Sigma_User
	getUser!: Sequelize.BelongsToGetAssociationMixin<Sigma_User>
	setUser!: Sequelize.BelongsToSetAssociationMixin<Sigma_User, Sigma_UserId>
	createUser!: Sequelize.BelongsToCreateAssociationMixin<Sigma_User>

	static initModel(sequelize: Sequelize.Sequelize): typeof Sigma_UserRole {
		return Sigma_UserRole.init(
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
				roleID: {
					type: DataTypes.INTEGER,
					allowNull: true,
					references: {
						model: "Sigma_Role",
						key: "id",
					},
				},
			},
			{
				sequelize,
				tableName: "Sigma_UserRole",
				schema: "dbo",
				timestamps: true,
				paranoid: true,
				indexes: [
					{
						name: "PK__Sigma_Us__3213E83FAEEE0420",
						unique: true,
						fields: [{ name: "id" }],
					},
				],
			}
		)
	}

	static associate(models: any): void {
		Sigma_UserRole.belongsTo(models.Sigma_Role, { foreignKey: "roleID" })
	}
}
