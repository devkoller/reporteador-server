import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"
import { DB } from "../../../dbModels/cgi.models"

export interface panelsTabsAttributes {
	id: number
	idPanel?: number
	name?: string
	description?: string
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
}

export type panelsTabsPk = "id"
export type panelsTabsId = panelsTabs[panelsTabsPk]
export type panelsTabsOptionalAttributes =
	| "id"
	| "idPanel"
	| "name"
	| "description"
	| "createdAt"
	| "updatedAt"
	| "deletedAt"
export type panelsTabsCreationAttributes = Optional<
	panelsTabsAttributes,
	panelsTabsOptionalAttributes
>

export class panelsTabs
	extends Model<panelsTabsAttributes, panelsTabsCreationAttributes>
	implements panelsTabsAttributes
{
	id!: number
	idPanel?: number
	name?: string
	description?: string
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date

	static initModel(sequelize: Sequelize.Sequelize): typeof panelsTabs {
		return panelsTabs.init(
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
				name: {
					type: DataTypes.STRING(50),
					allowNull: true,
				},
				description: {
					type: DataTypes.TEXT,
					allowNull: true,
				},
			},
			{
				sequelize,
				tableName: "panelsTabs",
				schema: "dbo",
				timestamps: true,
				paranoid: true,
				indexes: [
					{
						name: "PK_panelsTabs",
						unique: true,
						fields: [{ name: "id" }],
					},
				],
			}
		)
	}

	static associate(models: DB) {
		// Cada tab pertenece a un panel
		// panelsTabs.belongsTo(models.statisticsPanels, {
		// 	foreignKey: "idPanel",
		// 	as: "panel",
		// })
		// Si quisieras una relación inversa (opcional),
		// el modelo panels debe tener en su associate:
		//   models.panels.hasMany(models.panelsTabs, { foreignKey: 'idPanel', as: 'tabs' });
	}
}
