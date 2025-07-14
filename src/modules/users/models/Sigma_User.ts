import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"
import { Sigma_UserRole } from "./Sigma_UserRole"
import { Sigma_UserPermission } from "./Sigma_UserPermission"

export interface Sigma_UserAttributes {
	id: number
	username: string
	passwordHash: string
	isActive: boolean
	isVerified: boolean
	twoFactorEnabled: boolean
	failedLoginAttempts: number
	lockoutUntil?: Date
	lastPasswordUpdate?: Date
	lastLoginAt?: Date
	lastIP?: string
}

export type Sigma_UserPk = "id"
export type Sigma_UserId = Sigma_User[Sigma_UserPk]
export type Sigma_UserOptionalAttributes =
	| "id"
	| "isActive"
	| "isVerified"
	| "twoFactorEnabled"
	| "failedLoginAttempts"
	| "lockoutUntil"
	| "lastPasswordUpdate"
	| "lastLoginAt"
	| "lastIP"
export type Sigma_UserCreationAttributes = Optional<
	Sigma_UserAttributes,
	Sigma_UserOptionalAttributes
>

export class Sigma_User
	extends Model<Sigma_UserAttributes, Sigma_UserCreationAttributes>
	implements Sigma_UserAttributes
{
	id!: number
	username!: string
	passwordHash!: string
	isActive!: boolean
	isVerified!: boolean
	twoFactorEnabled!: boolean
	failedLoginAttempts!: number
	lockoutUntil?: Date
	lastPasswordUpdate?: Date
	lastLoginAt?: Date
	lastIP?: string

	static initModel(sequelize: Sequelize.Sequelize): typeof Sigma_User {
		return Sigma_User.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
				},
				username: {
					type: DataTypes.STRING(50),
					allowNull: false,
					unique: "UQ__Sigma_Us__F3DBC57293949035",
				},
				passwordHash: {
					type: DataTypes.STRING(255),
					allowNull: false,
				},
				isActive: {
					type: DataTypes.BOOLEAN,
					allowNull: false,
					defaultValue: true,
				},
				isVerified: {
					type: DataTypes.BOOLEAN,
					allowNull: false,
					defaultValue: false,
				},
				twoFactorEnabled: {
					type: DataTypes.BOOLEAN,
					allowNull: false,
					defaultValue: false,
				},
				failedLoginAttempts: {
					type: DataTypes.INTEGER,
					allowNull: false,
					defaultValue: 0,
				},
				lockoutUntil: {
					type: DataTypes.DATE,
					allowNull: true,
				},
				lastPasswordUpdate: {
					type: DataTypes.DATE,
					allowNull: true,
				},
				lastLoginAt: {
					type: DataTypes.DATE,
					allowNull: true,
				},
				lastIP: {
					type: DataTypes.STRING(25),
					allowNull: true,
				},
			},
			{
				sequelize,
				tableName: "Sigma_User",
				schema: "dbo",
				timestamps: true,
				indexes: [
					{
						name: "PK__Sigma_Us__3213E83F93FBA2F0",
						unique: true,
						fields: [{ name: "id" }],
					},
					{
						name: "UQ__Sigma_Us__F3DBC57293949035",
						unique: true,
						fields: [{ name: "username" }],
					},
				],
			}
		)
	}

	static associate(models: any): void {
		// Sigma_User hasMany Sigma_PasswordHistory
		Sigma_User.hasMany(models.Sigma_PasswordHistory, {
			as: "PasswordHistories",
			foreignKey: "userID",
		})

		// Sigma_User hasOne Sigma_Person
		Sigma_User.hasOne(models.Sigma_Person, {
			as: "Person",
			foreignKey: "userID",
		})

		Sigma_User.hasMany(Sigma_UserRole, { foreignKey: "userID" })
		Sigma_User.hasMany(Sigma_UserPermission, { foreignKey: "userID" })
	}
}
