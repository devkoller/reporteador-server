import * as Sequelize from "sequelize"
import { DataTypes, Model, Optional } from "sequelize"
import type { User, UserId } from "./User.model"

export interface PersonAttributes {
	id: number
	userID?: number
	firstName: string
	lastName1: string
	lastName2: string
	dateOfBirth?: string
	gender?: string
	documentType?: string
	documentNumber?: string
	address?: string
	phone?: string
	email?: string
}

export type PersonPk = "id"
export type PersonId = Person[PersonPk]
export type PersonOptionalAttributes =
	| "id"
	| "userID"
	| "dateOfBirth"
	| "gender"
	| "documentType"
	| "documentNumber"
	| "address"
	| "phone"
	| "email"
export type PersonCreationAttributes = Optional<
	PersonAttributes,
	PersonOptionalAttributes
>

export class Person
	extends Model<PersonAttributes, PersonCreationAttributes>
	implements PersonAttributes
{
	id!: number
	userID?: number
	firstName!: string
	lastName1!: string
	lastName2!: string
	dateOfBirth?: string
	gender?: string
	documentType?: string
	documentNumber?: string
	address?: string
	phone?: string
	email?: string
	createdAt!: Date
	updatedAt!: Date
	deletedAt?: Date

	// Person belongsTo User via userID
	user!: User
	getUser!: Sequelize.BelongsToGetAssociationMixin<User>
	setUser!: Sequelize.BelongsToSetAssociationMixin<User, UserId>
	createUser!: Sequelize.BelongsToCreateAssociationMixin<User>

	static initModel(sequelize: Sequelize.Sequelize): typeof Person {
		return Person.init(
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
						model: "User",
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
				dateOfBirth: {
					type: DataTypes.DATEONLY,
					allowNull: true,
				},
				gender: {
					type: DataTypes.CHAR(1),
					allowNull: true,
				},
				documentType: {
					type: DataTypes.STRING(20),
					allowNull: true,
				},
				documentNumber: {
					type: DataTypes.STRING(50),
					allowNull: true,
				},
				address: {
					type: DataTypes.STRING(255),
					allowNull: true,
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
				tableName: "Person",
				schema: "dbo",
				timestamps: true,
				paranoid: true,
				indexes: [
					{
						name: "PK__Person__3213E83FE079E876",
						unique: true,
						fields: [{ name: "id" }],
					},
				],
			}
		)
	}
}
