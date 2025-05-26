import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface vcamasAttributes {
  cod_cama: string;
  oficial_sn?: number;
  censable?: number;
  cod_uenf_pk: number;
  descuenf?: string;
  codigo_servicio: number;
  servicio?: string;
  codigo_estado_cama: number;
  estado_cama?: string;
  cod_centro: number;
  centro?: string;
  fisica?: number;
  divi?: number;
}

export type vcamasOptionalAttributes = "oficial_sn" | "censable" | "descuenf" | "servicio" | "estado_cama" | "centro" | "fisica" | "divi";
export type vcamasCreationAttributes = Optional<vcamasAttributes, vcamasOptionalAttributes>;

export class vcamas extends Model<vcamasAttributes, vcamasCreationAttributes> implements vcamasAttributes {
  cod_cama!: string;
  oficial_sn?: number;
  censable?: number;
  cod_uenf_pk!: number;
  descuenf?: string;
  codigo_servicio!: number;
  servicio?: string;
  codigo_estado_cama!: number;
  estado_cama?: string;
  cod_centro!: number;
  centro?: string;
  fisica?: number;
  divi?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof vcamas {
    return vcamas.init({
    cod_cama: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    oficial_sn: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    censable: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cod_uenf_pk: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    descuenf: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    codigo_servicio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    servicio: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    codigo_estado_cama: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado_cama: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    cod_centro: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    centro: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    fisica: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    divi: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vcamas',
    schema: 'dbo',
    timestamps: false
  });
  }
}
