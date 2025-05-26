import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"
import type { Role, RoleId } from "../../permissions/models/Role.model"
import type { User, UserId } from "./User.model"

export interface UserRoleAttributes {
	userID: number
	roleID: number
}

export type UserRolePk = "userID" | "roleID"
export type UserRoleId = UserRole[UserRolePk]
export type UserRoleCreationAttributes = UserRoleAttributes

export class UserRole
	extends Model<UserRoleAttributes, UserRoleCreationAttributes>
	implements UserRoleAttributes
{
	userID!: number
	roleID!: number

	// UserRole belongsTo Role via roleID
	role!: Role
	getRole!: Sequelize.BelongsToGetAssociationMixin<Role>
	setRole!: Sequelize.BelongsToSetAssociationMixin<Role, RoleId>
	createRole!: Sequelize.BelongsToCreateAssociationMixin<Role>
	// UserRole belongsTo User via userID
	user!: User
	getUser!: Sequelize.BelongsToGetAssociationMixin<User>
	setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>
	createUser!: Sequelize.BelongsToCreateAssociationMixin<User>

	static initModel(sequelize: Sequelize.Sequelize): typeof UserRole {
		return UserRole.init(
			{
				userID: {
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
					references: {
						model: "User",
						key: "id",
					},
				},
				roleID: {
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
					references: {
						model: "Role",
						key: "id",
					},
				},
			},
			{
				sequelize,
				tableName: "UserRole",
				schema: "dbo",
				timestamps: false,
				indexes: [
					{
						name: "pk_UserRole",
						unique: true,
						fields: [{ name: "userID" }, { name: "roleID" }],
					},
				],
			}
		)
	}
}
