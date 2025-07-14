import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Sigma_User, Sigma_UserId } from './Sigma_User';

export interface Sigma_UserCenterAttributes {
  id: number;
  userID?: number;
  centerID?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type Sigma_UserCenterPk = "id";
export type Sigma_UserCenterId = Sigma_UserCenter[Sigma_UserCenterPk];
export type Sigma_UserCenterOptionalAttributes = "id" | "userID" | "centerID" | "createdAt" | "updatedAt" | "deletedAt";
export type Sigma_UserCenterCreationAttributes = Optional<Sigma_UserCenterAttributes, Sigma_UserCenterOptionalAttributes>;

export class Sigma_UserCenter extends Model<Sigma_UserCenterAttributes, Sigma_UserCenterCreationAttributes> implements Sigma_UserCenterAttributes {
  id!: number;
  userID?: number;
  centerID?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // Sigma_UserCenter belongsTo Sigma_User via userID
  user!: Sigma_User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Sigma_User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Sigma_User, Sigma_UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Sigma_User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Sigma_UserCenter {
    return Sigma_UserCenter.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Sigma_User',
        key: 'id'
      }
    },
    centerID: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Sigma_UserCenter',
    schema: 'dbo',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PK__Sigma_Us__3213E83F1898DE2F",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
