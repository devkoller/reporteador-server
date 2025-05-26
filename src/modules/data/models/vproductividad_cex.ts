import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface vproductividad_cexAttributes {
  codigo_centro?: number;
  centro?: string;
  serv_bas_pk?: number;
  serv_bas_desc?: string;
  cex_pk: number;
  fecha: Date;
  'edadaños'?: number;
  EdadMeses?: number;
  EdadDias?: number;
  fh_llegada?: Date;
  fh_entrada?: Date;
  fh_salida?: Date;
  medico_responsable?: string;
  rud?: string;
  agenda?: string;
  codigo_servicio?: number;
  servicio_agenda?: string;
  div?: number;
  c_sev?: number;
  curp?: string;
  nombrecom?: string;
  registro?: string;
  fecha_nac?: Date;
  c_EDAD: number;
  t_edad: string;
  gp_edad: number;
  gpoedad: string;
  SEXO?: string;
  apellido1?: string;
  apellido2?: string;
  nombre?: string;
  codigo_estado?: string;
  estado?: string;
  codigo_municipio?: string;
  municipio?: string;
  codigo_localidad?: string;
  localidad?: string;
  codigo_colonia?: string;
  colonia?: string;
  'CITAS_AÑO'?: string;
  'CITAS_SERV_AÑO'?: string;
  id_tipo_visita: string;
  Tipo_visita?: string;
  cdiag1: string;
  DIAGNOSTICO?: string;
  'Numero Recibo de Pago'?: string;
  Contrareferido?: string;
  Referido?: string;
  'Control Prenatal'?: string;
  'Tratamiento Familiar'?: string;
  Nutricion?: string;
  'Planificacion Familiar'?: string;
  Detecciones?: string;
  'Hidratación Oral'?: string;
  'Hidratación número'?: string;
  'Infecciones Vias Resp.'?: string;
  epis_pk?: number;
  curp_med?: string;
  nombre_med?: string;
  apellido1_med?: string;
  apellido2_med?: string;
  categoria_med?: number;
  cedula?: string;
  dgp?: string;
  codigo_sexo?: number;
  segpop?: string;
  segsoc1?: string;
  idsegsoc1?: number;
  cod_estado?: string;
  estado_cita?: string;
  tipo_citacion?: number;
  TIPO_CITA?: string;
  hora_forzado?: Date;
  fecha_forzado?: Date;
  fecha_emision?: Date;
  hora_emision?: Date;
  cex_hora_ent?: string;
  cex_hora_sal?: string;
  cex_hora_cita?: string;
  cex_hora_creac?: Date;
  codigo_personal?: number;
  codigo_personal1?: number;
  codigo_personal2?: number;
  icd_cod?: string;
  diagnosticos?: string;
  cod_pagador_evento?: number;
  nom_pagador_evento?: string;
  nombre_corto?: string;
  Turno: string;
  cod_modelo: number;
  agenda_efectora?: string;
  prest_item_cod?: string;
  prest_item_desc?: string;
  idpaisorigen?: string;
  n_solic?: number;
}

export type vproductividad_cexOptionalAttributes = "codigo_centro" | "centro" | "serv_bas_pk" | "serv_bas_desc" | "edadaños" | "EdadMeses" | "EdadDias" | "fh_llegada" | "fh_entrada" | "fh_salida" | "medico_responsable" | "rud" | "agenda" | "codigo_servicio" | "servicio_agenda" | "div" | "c_sev" | "curp" | "nombrecom" | "registro" | "fecha_nac" | "SEXO" | "apellido1" | "apellido2" | "nombre" | "codigo_estado" | "estado" | "codigo_municipio" | "municipio" | "codigo_localidad" | "localidad" | "codigo_colonia" | "colonia" | "CITAS_AÑO" | "CITAS_SERV_AÑO" | "Tipo_visita" | "DIAGNOSTICO" | "Numero Recibo de Pago" | "Contrareferido" | "Referido" | "Control Prenatal" | "Tratamiento Familiar" | "Nutricion" | "Planificacion Familiar" | "Detecciones" | "Hidratación Oral" | "Hidratación número" | "Infecciones Vias Resp." | "epis_pk" | "curp_med" | "nombre_med" | "apellido1_med" | "apellido2_med" | "categoria_med" | "cedula" | "dgp" | "codigo_sexo" | "segpop" | "segsoc1" | "idsegsoc1" | "cod_estado" | "estado_cita" | "tipo_citacion" | "TIPO_CITA" | "hora_forzado" | "fecha_forzado" | "fecha_emision" | "hora_emision" | "cex_hora_ent" | "cex_hora_sal" | "cex_hora_cita" | "cex_hora_creac" | "codigo_personal" | "codigo_personal1" | "codigo_personal2" | "icd_cod" | "diagnosticos" | "cod_pagador_evento" | "nom_pagador_evento" | "nombre_corto" | "agenda_efectora" | "prest_item_cod" | "prest_item_desc" | "idpaisorigen" | "n_solic";
export type vproductividad_cexCreationAttributes = Optional<vproductividad_cexAttributes, vproductividad_cexOptionalAttributes>;

export class vproductividad_cex extends Model<vproductividad_cexAttributes, vproductividad_cexCreationAttributes> implements vproductividad_cexAttributes {
  codigo_centro?: number;
  centro?: string;
  serv_bas_pk?: number;
  serv_bas_desc?: string;
  cex_pk!: number;
  fecha!: Date;
  'edadaños'?: number;
  EdadMeses?: number;
  EdadDias?: number;
  fh_llegada?: Date;
  fh_entrada?: Date;
  fh_salida?: Date;
  medico_responsable?: string;
  rud?: string;
  agenda?: string;
  codigo_servicio?: number;
  servicio_agenda?: string;
  div?: number;
  c_sev?: number;
  curp?: string;
  nombrecom?: string;
  registro?: string;
  fecha_nac?: Date;
  c_EDAD!: number;
  t_edad!: string;
  gp_edad!: number;
  gpoedad!: string;
  SEXO?: string;
  apellido1?: string;
  apellido2?: string;
  nombre?: string;
  codigo_estado?: string;
  estado?: string;
  codigo_municipio?: string;
  municipio?: string;
  codigo_localidad?: string;
  localidad?: string;
  codigo_colonia?: string;
  colonia?: string;
  'CITAS_AÑO'?: string;
  'CITAS_SERV_AÑO'?: string;
  id_tipo_visita!: string;
  Tipo_visita?: string;
  cdiag1!: string;
  DIAGNOSTICO?: string;
  'Numero Recibo de Pago'?: string;
  Contrareferido?: string;
  Referido?: string;
  'Control Prenatal'?: string;
  'Tratamiento Familiar'?: string;
  Nutricion?: string;
  'Planificacion Familiar'?: string;
  Detecciones?: string;
  'Hidratación Oral'?: string;
  'Hidratación número'?: string;
  'Infecciones Vias Resp.'?: string;
  epis_pk?: number;
  curp_med?: string;
  nombre_med?: string;
  apellido1_med?: string;
  apellido2_med?: string;
  categoria_med?: number;
  cedula?: string;
  dgp?: string;
  codigo_sexo?: number;
  segpop?: string;
  segsoc1?: string;
  idsegsoc1?: number;
  cod_estado?: string;
  estado_cita?: string;
  tipo_citacion?: number;
  TIPO_CITA?: string;
  hora_forzado?: Date;
  fecha_forzado?: Date;
  fecha_emision?: Date;
  hora_emision?: Date;
  cex_hora_ent?: string;
  cex_hora_sal?: string;
  cex_hora_cita?: string;
  cex_hora_creac?: Date;
  codigo_personal?: number;
  codigo_personal1?: number;
  codigo_personal2?: number;
  icd_cod?: string;
  diagnosticos?: string;
  cod_pagador_evento?: number;
  nom_pagador_evento?: string;
  nombre_corto?: string;
  Turno!: string;
  cod_modelo!: number;
  agenda_efectora?: string;
  prest_item_cod?: string;
  prest_item_desc?: string;
  idpaisorigen?: string;
  n_solic?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof vproductividad_cex {
    return vproductividad_cex.init({
    codigo_centro: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    centro: {
      type: DataTypes.STRING(29),
      allowNull: true
    },
    serv_bas_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    serv_bas_desc: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    cex_pk: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    'edadaños': {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EdadMeses: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EdadDias: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fh_llegada: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fh_entrada: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fh_salida: {
      type: DataTypes.DATE,
      allowNull: true
    },
    medico_responsable: {
      type: DataTypes.STRING(302),
      allowNull: true
    },
    rud: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    agenda: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    codigo_servicio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    servicio_agenda: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    div: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    c_sev: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    curp: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    nombrecom: {
      type: DataTypes.CHAR(150),
      allowNull: true
    },
    registro: {
      type: DataTypes.CHAR(15),
      allowNull: true
    },
    fecha_nac: {
      type: DataTypes.DATE,
      allowNull: true
    },
    c_EDAD: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    t_edad: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    gp_edad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gpoedad: {
      type: DataTypes.STRING(2),
      allowNull: false
    },
    SEXO: {
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
    codigo_estado: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    estado: {
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
    },
    'CITAS_AÑO': {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    'CITAS_SERV_AÑO': {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    id_tipo_visita: {
      type: DataTypes.CHAR(2),
      allowNull: false
    },
    Tipo_visita: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    cdiag1: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    DIAGNOSTICO: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    'Numero Recibo de Pago': {
      type: DataTypes.CHAR(25),
      allowNull: true
    },
    Contrareferido: {
      type: DataTypes.CHAR(25),
      allowNull: true
    },
    Referido: {
      type: DataTypes.CHAR(25),
      allowNull: true
    },
    'Control Prenatal': {
      type: DataTypes.CHAR(25),
      allowNull: true
    },
    'Tratamiento Familiar': {
      type: DataTypes.CHAR(25),
      allowNull: true
    },
    Nutricion: {
      type: DataTypes.CHAR(25),
      allowNull: true
    },
    'Planificacion Familiar': {
      type: DataTypes.CHAR(25),
      allowNull: true
    },
    Detecciones: {
      type: DataTypes.CHAR(25),
      allowNull: true
    },
    'Hidratación Oral': {
      type: DataTypes.CHAR(25),
      allowNull: true
    },
    'Hidratación número': {
      type: DataTypes.CHAR(25),
      allowNull: true
    },
    'Infecciones Vias Resp.': {
      type: DataTypes.CHAR(25),
      allowNull: true
    },
    epis_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    curp_med: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    nombre_med: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    apellido1_med: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    apellido2_med: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    categoria_med: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cedula: {
      type: DataTypes.CHAR(12),
      allowNull: true
    },
    dgp: {
      type: DataTypes.CHAR(40),
      allowNull: true
    },
    codigo_sexo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    segpop: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    segsoc1: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    idsegsoc1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cod_estado: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    estado_cita: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    tipo_citacion: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    TIPO_CITA: {
      type: DataTypes.STRING(10),
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
    fecha_emision: {
      type: DataTypes.DATE,
      allowNull: true
    },
    hora_emision: {
      type: DataTypes.DATE,
      allowNull: true
    },
    cex_hora_ent: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    cex_hora_sal: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    cex_hora_cita: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    cex_hora_creac: {
      type: DataTypes.DATE,
      allowNull: true
    },
    codigo_personal: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    codigo_personal1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    codigo_personal2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    icd_cod: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    diagnosticos: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cod_pagador_evento: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nom_pagador_evento: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    nombre_corto: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Turno: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    cod_modelo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    agenda_efectora: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    prest_item_cod: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    prest_item_desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    idpaisorigen: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    n_solic: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vproductividad_cex',
    schema: 'dbo',
    timestamps: false
  });
  }
}
