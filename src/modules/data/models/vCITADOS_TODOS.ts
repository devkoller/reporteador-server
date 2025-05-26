import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface vCITADOS_TODOSAttributes {
  FECHA?: string;
  HORA?: string;
  Medico?: string;
  cod_modelo: number;
  cod_estado?: string;
  estado?: string;
  tipo?: number;
  TIPO_CITA?: string;
  centro?: number;
  servicio?: string;
  cita?: Date;
  codigo_servicio?: number;
  codigo_personal: number;
  codigo_visita: string;
  visita?: string;
  registro?: string;
  nombrecom?: string;
  fecha_nac?: Date;
  nombre_sexo?: string;
  segsoc1?: string;
  segpop?: string;
  curp?: string;
  apellido1?: string;
  apellido2?: string;
  nombre?: string;
  archivo?: string;
  activa_sn?: number;
  codigo_personal2?: number;
  rud_emision?: string;
  login_emision?: string;
  fecha_emision?: Date;
  hora_emision?: Date;
  codigo_personal4?: number;
  hora_forzado?: Date;
  fecha_forzado?: Date;
  usu_cambio_asiconf?: number;
  asist_conf_sn?: number;
  citado_confcita?: number;
  hora_llamada?: Date;
  codigo_personal7?: number;
  cod_pers_reg_prof?: number;
  HORA_INI_AGENDA?: string;
  HORA_FIN_AGENDA?: string;
  n_solic?: number;
  fecha_bloqueo?: Date;
  obser_bloqueo?: string;
  user_bloqueo?: string;
  rud_bloqueo?: string;
  t_entrada?: Date;
  t_salida?: Date;
  codigo_cliente?: number;
  centro_siglas?: string;
  codigo_estado?: string;
  estado_res?: string;
  codigo_estado_nac?: string;
  estado_nac?: string;
  codigo_municipio?: string;
  municipio?: string;
  codigo_localidad?: string;
  localidad?: string;
  codigo_colonia?: string;
  colonia?: string;
}

export type vCITADOS_TODOSOptionalAttributes = "FECHA" | "HORA" | "Medico" | "cod_estado" | "estado" | "tipo" | "TIPO_CITA" | "centro" | "servicio" | "cita" | "codigo_servicio" | "visita" | "registro" | "nombrecom" | "fecha_nac" | "nombre_sexo" | "segsoc1" | "segpop" | "curp" | "apellido1" | "apellido2" | "nombre" | "archivo" | "activa_sn" | "codigo_personal2" | "rud_emision" | "login_emision" | "fecha_emision" | "hora_emision" | "codigo_personal4" | "hora_forzado" | "fecha_forzado" | "usu_cambio_asiconf" | "asist_conf_sn" | "citado_confcita" | "hora_llamada" | "codigo_personal7" | "cod_pers_reg_prof" | "HORA_INI_AGENDA" | "HORA_FIN_AGENDA" | "n_solic" | "fecha_bloqueo" | "obser_bloqueo" | "user_bloqueo" | "rud_bloqueo" | "t_entrada" | "t_salida" | "codigo_cliente" | "centro_siglas" | "codigo_estado" | "estado_res" | "codigo_estado_nac" | "estado_nac" | "codigo_municipio" | "municipio" | "codigo_localidad" | "localidad" | "codigo_colonia" | "colonia";
export type vCITADOS_TODOSCreationAttributes = Optional<vCITADOS_TODOSAttributes, vCITADOS_TODOSOptionalAttributes>;

export class vCITADOS_TODOS extends Model<vCITADOS_TODOSAttributes, vCITADOS_TODOSCreationAttributes> implements vCITADOS_TODOSAttributes {
  FECHA?: string;
  HORA?: string;
  Medico?: string;
  cod_modelo!: number;
  cod_estado?: string;
  estado?: string;
  tipo?: number;
  TIPO_CITA?: string;
  centro?: number;
  servicio?: string;
  cita?: Date;
  codigo_servicio?: number;
  codigo_personal!: number;
  codigo_visita!: string;
  visita?: string;
  registro?: string;
  nombrecom?: string;
  fecha_nac?: Date;
  nombre_sexo?: string;
  segsoc1?: string;
  segpop?: string;
  curp?: string;
  apellido1?: string;
  apellido2?: string;
  nombre?: string;
  archivo?: string;
  activa_sn?: number;
  codigo_personal2?: number;
  rud_emision?: string;
  login_emision?: string;
  fecha_emision?: Date;
  hora_emision?: Date;
  codigo_personal4?: number;
  hora_forzado?: Date;
  fecha_forzado?: Date;
  usu_cambio_asiconf?: number;
  asist_conf_sn?: number;
  citado_confcita?: number;
  hora_llamada?: Date;
  codigo_personal7?: number;
  cod_pers_reg_prof?: number;
  HORA_INI_AGENDA?: string;
  HORA_FIN_AGENDA?: string;
  n_solic?: number;
  fecha_bloqueo?: Date;
  obser_bloqueo?: string;
  user_bloqueo?: string;
  rud_bloqueo?: string;
  t_entrada?: Date;
  t_salida?: Date;
  codigo_cliente?: number;
  centro_siglas?: string;
  codigo_estado?: string;
  estado_res?: string;
  codigo_estado_nac?: string;
  estado_nac?: string;
  codigo_municipio?: string;
  municipio?: string;
  codigo_localidad?: string;
  localidad?: string;
  codigo_colonia?: string;
  colonia?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof vCITADOS_TODOS {
    return vCITADOS_TODOS.init({
    FECHA: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    HORA: {
      type: DataTypes.CHAR(5),
      allowNull: true
    },
    Medico: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    cod_modelo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cod_estado: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    estado: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    tipo: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    TIPO_CITA: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    centro: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    servicio: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    cita: {
      type: DataTypes.DATE,
      allowNull: true
    },
    codigo_servicio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    codigo_personal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    codigo_visita: {
      type: DataTypes.CHAR(2),
      allowNull: false
    },
    visita: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    registro: {
      type: DataTypes.CHAR(15),
      allowNull: true
    },
    nombrecom: {
      type: DataTypes.CHAR(150),
      allowNull: true
    },
    fecha_nac: {
      type: DataTypes.DATE,
      allowNull: true
    },
    nombre_sexo: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    segsoc1: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    segpop: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    curp: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    apellido1: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    apellido2: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    nombre: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    archivo: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    activa_sn: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    codigo_personal2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rud_emision: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    login_emision: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    fecha_emision: {
      type: DataTypes.DATE,
      allowNull: true
    },
    hora_emision: {
      type: DataTypes.DATE,
      allowNull: true
    },
    codigo_personal4: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hora_forzado: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fecha_forzado: {
      type: DataTypes.DATE,
      allowNull: true
    },
    usu_cambio_asiconf: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    asist_conf_sn: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    citado_confcita: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    hora_llamada: {
      type: DataTypes.DATE,
      allowNull: true
    },
    codigo_personal7: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cod_pers_reg_prof: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    HORA_INI_AGENDA: {
      type: DataTypes.CHAR(5),
      allowNull: true
    },
    HORA_FIN_AGENDA: {
      type: DataTypes.CHAR(5),
      allowNull: true
    },
    n_solic: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha_bloqueo: {
      type: DataTypes.DATE,
      allowNull: true
    },
    obser_bloqueo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_bloqueo: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    rud_bloqueo: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    t_entrada: {
      type: DataTypes.DATE,
      allowNull: true
    },
    t_salida: {
      type: DataTypes.DATE,
      allowNull: true
    },
    codigo_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    centro_siglas: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    codigo_estado: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    estado_res: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    codigo_estado_nac: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    estado_nac: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    codigo_municipio: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    municipio: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    codigo_localidad: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    localidad: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    codigo_colonia: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    colonia: {
      type: DataTypes.CHAR(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vCITADOS_TODOS',
    schema: 'dbo',
    timestamps: false
  });
  }
}
