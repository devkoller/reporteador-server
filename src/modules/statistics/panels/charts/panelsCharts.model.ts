import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"

export interface panelsChartsAttributes {
	id: number
	idPanel?: number
	idTab?: number
	name?: string
	description?: string
	nvariable?: string
	type?: string
	fastFilter?: boolean
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
}

export type panelsChartsPk = "id"
export type panelsChartsId = panelsCharts[panelsChartsPk]
export type panelsChartsOptionalAttributes =
	| "id"
	| "idPanel"
	| "idTab"
	| "name"
	| "description"
	| "nvariable"
	| "type"
	| "fastFilter"
	| "createdAt"
	| "updatedAt"
	| "deletedAt"
export type panelsChartsCreationAttributes = Optional<
	panelsChartsAttributes,
	panelsChartsOptionalAttributes
>

export class panelsCharts
	extends Model<panelsChartsAttributes, panelsChartsCreationAttributes>
	implements panelsChartsAttributes
{
	id!: number
	idPanel?: number
	idTab?: number
	name?: string
	description?: string
	nvariable?: string
	type?: string
	fastFilter?: boolean
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date

	static initModel(sequelize: Sequelize.Sequelize): typeof panelsCharts {
		return panelsCharts.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
				},
				idPanel: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				idTab: {
					type: DataTypes.INTEGER,
					allowNull: true,
				},
				name: {
					type: DataTypes.STRING(100),
					allowNull: true,
				},
				description: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
				nvariable: {
					type: DataTypes.STRING(50),
					allowNull: true,
				},
				type: {
					type: DataTypes.STRING(15),
					allowNull: true,
				},
				fastFilter: {
					type: DataTypes.BOOLEAN,
					allowNull: true,
				},
			},
			{
				sequelize,
				tableName: "panelsCharts",
				schema: "dbo",
				timestamps: true,
				paranoid: true,
				indexes: [
					{
						name: "PK_panelsCharts",
						unique: true,
						fields: [{ name: "id" }],
					},
				],
			}
		)
	}
}
