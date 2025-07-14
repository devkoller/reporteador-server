import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Sigma_TypePermission, Sigma_TypePermissionId } from './Sigma_TypePermission';

export interface Sigma_ResourceAttributes {
  id: number;
  name: string;
  description?: string;
  resource?: string;
  typePermissionID: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  backendResource?: string;
}

export type Sigma_ResourcePk = "id";
export type Sigma_ResourceId = Sigma_Resource[Sigma_ResourcePk];
export type Sigma_ResourceOptionalAttributes = "id" | "description" | "resource" | "createdAt" | "updatedAt" | "deletedAt" | "backendResource";
export type Sigma_ResourceCreationAttributes = Optional<Sigma_ResourceAttributes, Sigma_ResourceOptionalAttributes>;

export class Sigma_Resource extends Model<Sigma_ResourceAttributes, Sigma_ResourceCreationAttributes> implements Sigma_ResourceAttributes {
  id!: number;
  name!: string;
  description?: string;
  resource?: string;
  typePermissionID!: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  backendResource?: string;

  // Sigma_Resource belongsTo Sigma_TypePermission via typePermissionID
  typePermission!: Sigma_TypePermission;
  getTypePermission!: Sequelize.BelongsToGetAssociationMixin<Sigma_TypePermission>;
  setTypePermission!: Sequelize.BelongsToSetAssociationMixin<Sigma_TypePermission, Sigma_TypePermissionId>;
  createTypePermission!: Sequelize.BelongsToCreateAssociationMixin<Sigma_TypePermission>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Sigma_Resource {
    return Sigma_Resource.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    resource: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    typePermissionID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Sigma_TypePermission',
        key: 'id'
      }
    },
    backendResource: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Sigma_Resource',
    schema: 'dbo',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PK__Sigma_Re__3213E83F754648F6",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
