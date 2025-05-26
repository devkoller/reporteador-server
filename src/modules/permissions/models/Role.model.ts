import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"

export interface RoleAttributes {
	id: number
	name: string
	description?: string
}

export type RolePk = "id"
export type RoleId = Role[RolePk]
export type RoleOptionalAttributes = "id" | "description"
export type RoleCreationAttributes = Optional<
	RoleAttributes,
	RoleOptionalAttributes
>

export class Role
	extends Model<RoleAttributes, RoleCreationAttributes>
	implements RoleAttributes
{
	id!: number
	name!: string
	description?: string

	static initModel(sequelize: Sequelize.Sequelize): typeof Role {
		return Role.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
				},
				name: {
					type: DataTypes.STRING(50),
					allowNull: false,
					unique: "UQ__Role__72E12F1B41AC7F88",
				},
				description: {
					type: DataTypes.STRING(255),
					allowNull: true,
				},
			},
			{
				sequelize,
				tableName: "Role",
				schema: "dbo",
				timestamps: true,
				paranoid: true,
				indexes: [
					{
						name: "PK__Role__3213E83F77AFEF15",
						unique: true,
						fields: [{ name: "id" }],
					},
					{
						name: "UQ__Role__72E12F1B41AC7F88",
						unique: true,
						fields: [{ name: "name" }],
					},
				],
			}
		)
	}
}
