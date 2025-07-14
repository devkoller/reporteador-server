import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface Sigma_CenterAttributes {
  id: number;
  name?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type Sigma_CenterPk = "id";
export type Sigma_CenterId = Sigma_Center[Sigma_CenterPk];
export type Sigma_CenterOptionalAttributes = "id" | "name" | "description" | "createdAt" | "updatedAt" | "deletedAt";
export type Sigma_CenterCreationAttributes = Optional<Sigma_CenterAttributes, Sigma_CenterOptionalAttributes>;

export class Sigma_Center extends Model<Sigma_CenterAttributes, Sigma_CenterCreationAttributes> implements Sigma_CenterAttributes {
  id!: number;
  name?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Sigma_Center {
    return Sigma_Center.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Sigma_Center',
    schema: 'dbo',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PK_Sigma_Center",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
