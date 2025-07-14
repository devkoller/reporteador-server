import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"
import type { Sigma_User, Sigma_UserId } from "./Sigma_User"

export interface Sigma_PasswordHistoryAttributes {
	id: number
	userID: number
	passwordHash: string
	usedAt: Date
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
}

export type Sigma_PasswordHistoryPk = "id"
export type Sigma_PasswordHistoryId =
	Sigma_PasswordHistory[Sigma_PasswordHistoryPk]
export type Sigma_PasswordHistoryOptionalAttributes =
	| "id"
	| "usedAt"
	| "createdAt"
	| "updatedAt"
	| "deletedAt"
export type Sigma_PasswordHistoryCreationAttributes = Optional<
	Sigma_PasswordHistoryAttributes,
	Sigma_PasswordHistoryOptionalAttributes
>

export class Sigma_PasswordHistory
	extends Model<
		Sigma_PasswordHistoryAttributes,
		Sigma_PasswordHistoryCreationAttributes
	>
	implements Sigma_PasswordHistoryAttributes
{
	id!: number
	userID!: number
	passwordHash!: string
	usedAt!: Date
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date

	// Sigma_PasswordHistory belongsTo Sigma_User via userID
	user!: Sigma_User
	getUser!: Sequelize.BelongsToGetAssociationMixin<Sigma_User>
	setUser!: Sequelize.BelongsToSetAssociationMixin<Sigma_User, Sigma_UserId>
	createUser!: Sequelize.BelongsToCreateAssociationMixin<Sigma_User>

	static initModel(
		sequelize: Sequelize.Sequelize
	): typeof Sigma_PasswordHistory {
		return Sigma_PasswordHistory.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
				},
				userID: {
					type: DataTypes.INTEGER,
					allowNull: false,
					references: {
						model: "Sigma_User",
						key: "id",
					},
				},
				passwordHash: {
					type: DataTypes.STRING(255),
					allowNull: false,
				},
				usedAt: {
					type: DataTypes.DATE,
					allowNull: false,
					defaultValue: Sequelize.Sequelize.fn("sysdatetime"),
				},
			},
			{
				sequelize,
				tableName: "Sigma_PasswordHistory",
				schema: "dbo",
				timestamps: true,
				paranoid: true,
				indexes: [
					{
						name: "PK__Sigma_Pa__3213E83F4F93126A",
						unique: true,
						fields: [{ name: "id" }],
					},
				],
			}
		)
	}
}
