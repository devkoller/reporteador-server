import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"

export interface Sigma_RoleAttributes {
	id: number
	name: string
	description?: string
	active?: boolean
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
}

export type Sigma_RolePk = "id"
export type Sigma_RoleId = Sigma_Role[Sigma_RolePk]
export type Sigma_RoleOptionalAttributes =
	| "id"
	| "description"
	| "active"
	| "createdAt"
	| "updatedAt"
	| "deletedAt"
export type Sigma_RoleCreationAttributes = Optional<
	Sigma_RoleAttributes,
	Sigma_RoleOptionalAttributes
>

export class Sigma_Role
	extends Model<Sigma_RoleAttributes, Sigma_RoleCreationAttributes>
	implements Sigma_RoleAttributes
{
	id!: number
	name!: string
	description?: string
	active?: boolean
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date

	static initModel(sequelize: Sequelize.Sequelize): typeof Sigma_Role {
		return Sigma_Role.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
				},
				name: {
					type: DataTypes.STRING(100),
					allowNull: false,
				},
				description: {
					type: DataTypes.STRING(255),
					allowNull: true,
				},
				active: {
					type: DataTypes.BOOLEAN,
					allowNull: true,
					defaultValue: true,
				},
			},
			{
				sequelize,
				tableName: "Sigma_Role",
				schema: "dbo",
				timestamps: true,
				paranoid: true,
				indexes: [
					{
						name: "PK__Sigma_Ro__3213E83FD9A86BE1",
						unique: true,
						fields: [{ name: "id" }],
					},
				],
			}
		)
	}

	static associate(models: any): void {
		// Sigma_User hasMany Sigma_PasswordHistory
		Sigma_Role.hasMany(models.Sigma_RolePermission, {
			as: "RolePermissions",
			foreignKey: "roleID",
		})
	}
}
