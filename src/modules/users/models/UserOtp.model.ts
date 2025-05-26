import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"
import type { User, UserId } from "./User.model"

export interface UserOtpAttributes {
	id: number
	userID: number
	code: string
	type: string
	expiresAt: Date
	used: boolean
}

export type UserOtpPk = "id"
export type UserOtpId = UserOtp[UserOtpPk]
export type UserOtpOptionalAttributes = "id" | "used"
export type UserOtpCreationAttributes = Optional<
	UserOtpAttributes,
	UserOtpOptionalAttributes
>

export class UserOtp
	extends Model<UserOtpAttributes, UserOtpCreationAttributes>
	implements UserOtpAttributes
{
	id!: number
	userID!: number
	code!: string
	type!: string
	expiresAt!: Date
	used!: boolean
	createdAt!: Date

	// UserOtp belongsTo User via userID
	user!: User
	getUser!: Sequelize.BelongsToGetAssociationMixin<User>
	setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>
	createUser!: Sequelize.BelongsToCreateAssociationMixin<User>

	static initModel(sequelize: Sequelize.Sequelize): typeof UserOtp {
		return UserOtp.init(
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
						model: "User",
						key: "id",
					},
				},
				code: {
					type: DataTypes.STRING(10),
					allowNull: false,
				},
				type: {
					type: DataTypes.STRING(30),
					allowNull: false,
				},
				expiresAt: {
					type: DataTypes.DATE,
					allowNull: false,
				},
				used: {
					type: DataTypes.BOOLEAN,
					allowNull: false,
					defaultValue: false,
				},
			},
			{
				sequelize,
				tableName: "UserOtp",
				schema: "dbo",
				timestamps: true,
				indexes: [
					{
						name: "PK__UserOtp__3213E83F1C7E6152",
						unique: true,
						fields: [{ name: "id" }],
					},
				],
			}
		)
	}
}
