import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"

export interface UserAttributes {
	id: number
	username: string
	email: string
	phone?: string
	passwordHash: string
	isActive: boolean
	isVerified: boolean
	twoFactorEnabled: boolean
	lastLoginAt?: Date
	failedLoginAttempts: number
	lockoutUntil?: Date
}

export type UserPk = "id"
export type UserId = User[UserPk]
export type UserOptionalAttributes =
	| "id"
	| "phone"
	| "isActive"
	| "isVerified"
	| "twoFactorEnabled"
	| "lastLoginAt"
	| "failedLoginAttempts"
	| "lockoutUntil"
export type UserCreationAttributes = Optional<
	UserAttributes,
	UserOptionalAttributes
>

export class User
	extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes
{
	id!: number
	username!: string
	email!: string
	phone?: string
	passwordHash!: string
	isActive!: boolean
	isVerified!: boolean
	twoFactorEnabled!: boolean
	lastLoginAt?: Date
	failedLoginAttempts!: number
	lockoutUntil?: Date

	static initModel(sequelize: Sequelize.Sequelize): typeof User {
		return User.init(
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
					unique: "UQ__User__F3DBC572D8E60866",
				},
				email: {
					type: DataTypes.STRING(150),
					allowNull: false,
					unique: "UQ__User__AB6E6164332862B0",
				},
				phone: {
					type: DataTypes.STRING(20),
					allowNull: true,
					unique: "UQ__User__B43B145F2623E9AE",
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
				lastLoginAt: {
					type: DataTypes.DATE,
					allowNull: true,
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
			},
			{
				sequelize,
				tableName: "User",
				schema: "dbo",
				timestamps: true,
				indexes: [
					{
						name: "PK__User__3213E83FBF2D094B",
						unique: true,
						fields: [{ name: "id" }],
					},
					{
						name: "UQ__User__AB6E6164332862B0",
						unique: true,
						fields: [{ name: "email" }],
					},
					{
						name: "UQ__User__B43B145F2623E9AE",
						unique: true,
						fields: [{ name: "phone" }],
					},
					{
						name: "UQ__User__F3DBC572D8E60866",
						unique: true,
						fields: [{ name: "username" }],
					},
				],
			}
		)
	}

	static associate(models: any) {
		User.belongsTo(models.Person, {
			foreignKey: "id",
		})
		// Define associations here
		// Example: User.hasMany(models.Post, { foreignKey: 'userId' });
	}
}
