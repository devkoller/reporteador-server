import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"
import type {
	Permission,
	PermissionId,
} from "../../permissions/models/Permission.model"
import type { User, UserId } from "./User.model"

export interface UserPermissionAttributes {
	userID: number
	permissionID: number
	isAllowed: boolean
}

export type UserPermissionPk = "userID" | "permissionID"
export type UserPermissionId = UserPermission[UserPermissionPk]
export type UserPermissionCreationAttributes = UserPermissionAttributes

export class UserPermission
	extends Model<UserPermissionAttributes, UserPermissionCreationAttributes>
	implements UserPermissionAttributes
{
	userID!: number
	permissionID!: number
	isAllowed!: boolean

	// UserPermission belongsTo Permission via permissionID
	permission!: Permission
	getPermission!: Sequelize.BelongsToGetAssociationMixin<Permission>
	setPermission!: Sequelize.BelongsToSetAssociationMixin<
		Permission,
		PermissionId
	>
	createPermission!: Sequelize.BelongsToCreateAssociationMixin<Permission>
	// UserPermission belongsTo User via userID
	user!: User
	getUser!: Sequelize.BelongsToGetAssociationMixin<User>
	setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>
	createUser!: Sequelize.BelongsToCreateAssociationMixin<User>

	static initModel(sequelize: Sequelize.Sequelize): typeof UserPermission {
		return UserPermission.init(
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
				permissionID: {
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
					references: {
						model: "Permission",
						key: "id",
					},
				},
				isAllowed: {
					type: DataTypes.BOOLEAN,
					allowNull: false,
				},
			},
			{
				sequelize,
				tableName: "UserPermission",
				schema: "dbo",
				timestamps: false,
				indexes: [
					{
						name: "pk_UserPermission",
						unique: true,
						fields: [{ name: "userID" }, { name: "permissionID" }],
					},
				],
			}
		)
	}
}
