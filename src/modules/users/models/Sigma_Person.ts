import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"
import type { Sigma_User, Sigma_UserId } from "./Sigma_User"

export interface Sigma_PersonAttributes {
	id: number
	userID?: number
	firstName: string
	lastName1: string
	lastName2: string
	phone?: string
	email?: string
}

export type Sigma_PersonPk = "id"
export type Sigma_PersonId = Sigma_Person[Sigma_PersonPk]
export type Sigma_PersonOptionalAttributes = "id" | "userID" | "phone" | "email"
export type Sigma_PersonCreationAttributes = Optional<
	Sigma_PersonAttributes,
	Sigma_PersonOptionalAttributes
>

export class Sigma_Person
	extends Model<Sigma_PersonAttributes, Sigma_PersonCreationAttributes>
	implements Sigma_PersonAttributes
{
	id!: number
	userID?: number
	firstName!: string
	lastName1!: string
	lastName2!: string
	phone?: string
	email?: string

	// Sigma_Person belongsTo Sigma_User via userID
	user!: Sigma_User
	getUser!: Sequelize.BelongsToGetAssociationMixin<Sigma_User>
	setUser!: Sequelize.BelongsToSetAssociationMixin<Sigma_User, Sigma_UserId>
	createUser!: Sequelize.BelongsToCreateAssociationMixin<Sigma_User>

	static initModel(sequelize: Sequelize.Sequelize): typeof Sigma_Person {
		return Sigma_Person.init(
			{
				id: {
					autoIncrement: true,
					type: DataTypes.INTEGER,
					allowNull: false,
					primaryKey: true,
				},
				userID: {
					type: DataTypes.INTEGER,
					allowNull: true,
					references: {
						model: "Sigma_User",
						key: "id",
					},
				},
				firstName: {
					type: DataTypes.STRING(100),
					allowNull: false,
				},
				lastName1: {
					type: DataTypes.STRING(100),
					allowNull: false,
				},
				lastName2: {
					type: DataTypes.STRING(100),
					allowNull: false,
				},
				phone: {
					type: DataTypes.STRING(20),
					allowNull: true,
				},
				email: {
					type: DataTypes.STRING(150),
					allowNull: true,
				},
			},
			{
				sequelize,
				tableName: "Sigma_Person",
				schema: "dbo",
				timestamps: true,
				paranoid: true,
				indexes: [
					{
						name: "PK__Sigma_Pe__3213E83F92D5C9DC",
						unique: true,
						fields: [{ name: "id" }],
					},
				],
			}
		)
	}
}
