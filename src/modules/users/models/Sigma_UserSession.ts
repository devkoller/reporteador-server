import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Sigma_User, Sigma_UserId } from './Sigma_User';

export interface Sigma_UserSessionAttributes {
  id: number;
  userID: number;
  token: string;
  expiration: Date;
  ip?: string;
  userAgent?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type Sigma_UserSessionPk = "id";
export type Sigma_UserSessionId = Sigma_UserSession[Sigma_UserSessionPk];
export type Sigma_UserSessionOptionalAttributes = "id" | "ip" | "userAgent" | "createdAt" | "updatedAt" | "deletedAt";
export type Sigma_UserSessionCreationAttributes = Optional<Sigma_UserSessionAttributes, Sigma_UserSessionOptionalAttributes>;

export class Sigma_UserSession extends Model<Sigma_UserSessionAttributes, Sigma_UserSessionCreationAttributes> implements Sigma_UserSessionAttributes {
  id!: number;
  userID!: number;
  token!: string;
  expiration!: Date;
  ip?: string;
  userAgent?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  // Sigma_UserSession belongsTo Sigma_User via userID
  user!: Sigma_User;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Sigma_User>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Sigma_User, Sigma_UserId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Sigma_User>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Sigma_UserSession {
    return Sigma_UserSession.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Sigma_User',
        key: 'id'
      }
    },
    token: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    expiration: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ip: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    userAgent: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Sigma_UserSession',
    schema: 'dbo',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PK__Sigma_Us__3213E83F00C96404",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
