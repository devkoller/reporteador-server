import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface Sigma_TypePermissionAttributes {
  id: number;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type Sigma_TypePermissionPk = "id";
export type Sigma_TypePermissionId = Sigma_TypePermission[Sigma_TypePermissionPk];
export type Sigma_TypePermissionOptionalAttributes = "id" | "createdAt" | "updatedAt" | "deletedAt";
export type Sigma_TypePermissionCreationAttributes = Optional<Sigma_TypePermissionAttributes, Sigma_TypePermissionOptionalAttributes>;

export class Sigma_TypePermission extends Model<Sigma_TypePermissionAttributes, Sigma_TypePermissionCreationAttributes> implements Sigma_TypePermissionAttributes {
  id!: number;
  type!: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof Sigma_TypePermission {
    return Sigma_TypePermission.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Sigma_TypePermission',
    schema: 'dbo',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PK__Sigma_Ty__3213E83F989808A7",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
