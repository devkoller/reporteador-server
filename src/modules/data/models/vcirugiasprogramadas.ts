import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface vcirugiasprogramadasAttributes {
  ci_inter_pk: number;
  ci_act_pk?: number;
  cod_centro?: number;
  centro?: string;
  Fecha?: Date;
  Hora_QX?: Date;
  Turno: string;
  QX?: string;
  Paciente?: string;
  registro?: string;
  FechaNac?: Date;
  nombre_sexo?: string;
  cama: string;
  Diagnostico?: string;
  Cirugia?: string;
  CCX?: string;
  cirujano?: string;
  Rud_Cirujano?: string;
  Radiologo?: string;
  Rud_Radiologo?: string;
  anestesiologo?: string;
  Rud_Anestesiologo?: string;
  MotivoSuspension?: string;
  servicio?: string;
  electivo?: number;
  imprevisto?: number;
  ambulatorio?: number;
  suspendida?: number;
  codigo_servicio?: number;
  icd_cod?: string;
  ci_inter_diagno1?: string;
  codigo_cliente?: number;
  codigo_personal1?: number;
  icd_cod_proc_ppal?: string;
  icd_nom_proc_ppal?: string;
  tipo_procedimiento_pk?: number;
  descripcion?: string;
  fechacir?: Date;
  ejercicio?: number;
  registro_reserva?: string;
  rud_reserva?: string;
  plan_pk?: number;
  cod_pagador_pk?: number;
}

export type vcirugiasprogramadasOptionalAttributes = "ci_act_pk" | "cod_centro" | "centro" | "Fecha" | "Hora_QX" | "QX" | "Paciente" | "registro" | "FechaNac" | "nombre_sexo" | "Diagnostico" | "Cirugia" | "CCX" | "cirujano" | "Rud_Cirujano" | "Radiologo" | "Rud_Radiologo" | "anestesiologo" | "Rud_Anestesiologo" | "MotivoSuspension" | "servicio" | "electivo" | "imprevisto" | "ambulatorio" | "suspendida" | "codigo_servicio" | "icd_cod" | "ci_inter_diagno1" | "codigo_cliente" | "codigo_personal1" | "icd_cod_proc_ppal" | "icd_nom_proc_ppal" | "tipo_procedimiento_pk" | "descripcion" | "fechacir" | "ejercicio" | "registro_reserva" | "rud_reserva" | "plan_pk" | "cod_pagador_pk";
export type vcirugiasprogramadasCreationAttributes = Optional<vcirugiasprogramadasAttributes, vcirugiasprogramadasOptionalAttributes>;

export class vcirugiasprogramadas extends Model<vcirugiasprogramadasAttributes, vcirugiasprogramadasCreationAttributes> implements vcirugiasprogramadasAttributes {
  ci_inter_pk!: number;
  ci_act_pk?: number;
  cod_centro?: number;
  centro?: string;
  Fecha?: Date;
  Hora_QX?: Date;
  Turno!: string;
  QX?: string;
  Paciente?: string;
  registro?: string;
  FechaNac?: Date;
  nombre_sexo?: string;
  cama!: string;
  Diagnostico?: string;
  Cirugia?: string;
  CCX?: string;
  cirujano?: string;
  Rud_Cirujano?: string;
  Radiologo?: string;
  Rud_Radiologo?: string;
  anestesiologo?: string;
  Rud_Anestesiologo?: string;
  MotivoSuspension?: string;
  servicio?: string;
  electivo?: number;
  imprevisto?: number;
  ambulatorio?: number;
  suspendida?: number;
  codigo_servicio?: number;
  icd_cod?: string;
  ci_inter_diagno1?: string;
  codigo_cliente?: number;
  codigo_personal1?: number;
  icd_cod_proc_ppal?: string;
  icd_nom_proc_ppal?: string;
  tipo_procedimiento_pk?: number;
  descripcion?: string;
  fechacir?: Date;
  ejercicio?: number;
  registro_reserva?: string;
  rud_reserva?: string;
  plan_pk?: number;
  cod_pagador_pk?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof vcirugiasprogramadas {
    return vcirugiasprogramadas.init({
    ci_inter_pk: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ci_act_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cod_centro: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    centro: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Hora_QX: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Turno: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    QX: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Paciente: {
      type: DataTypes.CHAR(150),
      allowNull: true
    },
    registro: {
      type: DataTypes.CHAR(15),
      allowNull: true
    },
    FechaNac: {
      type: DataTypes.DATE,
      allowNull: true
    },
    nombre_sexo: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    cama: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    Diagnostico: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Cirugia: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    CCX: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    cirujano: {
      type: DataTypes.STRING(302),
      allowNull: true
    },
    Rud_Cirujano: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Radiologo: {
      type: DataTypes.STRING(302),
      allowNull: true
    },
    Rud_Radiologo: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    anestesiologo: {
      type: DataTypes.STRING(302),
      allowNull: true
    },
    Rud_Anestesiologo: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    MotivoSuspension: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    servicio: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    electivo: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    imprevisto: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    ambulatorio: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    suspendida: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    codigo_servicio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    icd_cod: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    ci_inter_diagno1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    codigo_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    codigo_personal1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    icd_cod_proc_ppal: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    icd_nom_proc_ppal: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tipo_procedimiento_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fechacir: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ejercicio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    registro_reserva: {
      type: DataTypes.STRING(302),
      allowNull: true
    },
    rud_reserva: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    plan_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cod_pagador_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vcirugiasprogramadas',
    schema: 'dbo',
    timestamps: false
  });
  }
}
