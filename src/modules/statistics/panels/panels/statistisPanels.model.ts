import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"

export interface statistisPanelsAttributes {
	id: number
	name?: string
	description?: string
	icon?: string
	color?: string
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
	SqlQuery?: string
}

export type statistisPanelsPk = "id"
export type statistisPanelsId = statistisPanels[statistisPanelsPk]
export type statistisPanelsOptionalAttributes =
	| "id"
	| "name"
	| "description"
	| "icon"
	| "color"
	| "createdAt"
	| "updatedAt"
	| "deletedAt"
	| "SqlQuery"
export type statistisPanelsCreationAttributes = Optional<
	statistisPanelsAttributes,
	statistisPanelsOptionalAttributes
>

export class statistisPanels
	extends Model<statistisPanelsAttributes, statistisPanelsCreationAttributes>
	implements statistisPanelsAttributes
{
	id!: number
	name?: string
	description?: string
	icon?: string
	color?: string
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
	SqlQuery?: string

	static initModel(sequelize: Sequelize.Sequelize): typeof statistisPanels {
		return statistisPanels.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
				},
				name: {
					type: DataTypes.STRING(50),
					allowNull: true,
				},
				description: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				icon: {
					type: DataTypes.STRING(20),
					allowNull: true,
				},
				color: {
					type: DataTypes.STRING(20),
					allowNull: true,
				},
				SqlQuery: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
			},
			{
				sequelize,
				tableName: "statistisPanels",
				schema: "dbo",
				timestamps: true,
				paranoid: true,
				indexes: [
					{
						name: "PK_statistisPanels",
						unique: true,
						fields: [{ name: "id" }],
					},
				],
			}
		)
	}
}
