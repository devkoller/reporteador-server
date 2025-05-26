import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface vingresosadministrativosAttributes {
  registro?: string;
  epis_pk?: number;
  nombres: string;
  curp: string;
  fechacap2: string;
  Refe: string;
  apellido1: string;
  apellido2: string;
  id_segsoc?: number;
  segsoc?: string;
  Poliza?: string;
  fecha_nac?: string;
  direccion?: string;
  telefono?: string;
  id_loca?: string;
  Localidad?: string;
  id_muni?: string;
  Municipio?: string;
  id_esta?: string;
  Estado?: string;
  fechaing?: Date;
  fechaegr?: Date;
  numdias?: number;
  hrs?: string;
  cama?: string;
  CIE?: string;
  CIE_DESC?: string;
  capturo?: string;
  id_servicio?: number;
  servicio?: string;
  meding: string;
  Fecha_Alta: string;
  Hora_Alta: string;
  CIE_ALTA: string;
  CIE_DESC_ALTA: string;
  Motivo_alta: string;
  Motivo_alta_PK: number;
  Destino_alta: string;
  Destino_alta_PK: number;
  med_alta: string;
  id_Sexo?: number;
  sexo?: string;
  id_edocivil?: number;
  edocivil?: string;
  id_ocupa?: number;
  ocupa?: string;
  id_escol?: number;
  escol?: string;
  Procedencia?: string;
  Proc_urg?: string;
  id_proc_urg?: number;
  Pk_PISO?: string;
  PISO_DESC?: string;
  division: string;
  id_procede?: number;
  siih?: number;
  ssj?: number;
  divi?: number;
  cod_ingreso_pk?: number;
  cod_centro?: number;
  centro?: string;
  cod_uenf_pk?: number;
  unidad_enfermeria?: string;
  codigo_cliente?: number;
  cod_pagador_evento?: number;
  nom_pagador_evento?: string;
  ing_tipo_pk?: number;
  ing_tipo_desc?: string;
  id_servicio_egr?: number;
  servicio_egreso?: string;
  'edadaños'?: number;
  EdadMeses?: number;
  EdadDias?: number;
  TURNO_INGRESO?: string;
  FOLIO?: number;
  codigopostal?: string;
}

export type vingresosadministrativosOptionalAttributes = "registro" | "epis_pk" | "id_segsoc" | "segsoc" | "Poliza" | "fecha_nac" | "direccion" | "telefono" | "id_loca" | "Localidad" | "id_muni" | "Municipio" | "id_esta" | "Estado" | "fechaing" | "fechaegr" | "numdias" | "hrs" | "cama" | "CIE" | "CIE_DESC" | "capturo" | "id_servicio" | "servicio" | "id_Sexo" | "sexo" | "id_edocivil" | "edocivil" | "id_ocupa" | "ocupa" | "id_escol" | "escol" | "Procedencia" | "Proc_urg" | "id_proc_urg" | "Pk_PISO" | "PISO_DESC" | "id_procede" | "siih" | "ssj" | "divi" | "cod_ingreso_pk" | "cod_centro" | "centro" | "cod_uenf_pk" | "unidad_enfermeria" | "codigo_cliente" | "cod_pagador_evento" | "nom_pagador_evento" | "ing_tipo_pk" | "ing_tipo_desc" | "id_servicio_egr" | "servicio_egreso" | "edadaños" | "EdadMeses" | "EdadDias" | "TURNO_INGRESO" | "FOLIO" | "codigopostal";
export type vingresosadministrativosCreationAttributes = Optional<vingresosadministrativosAttributes, vingresosadministrativosOptionalAttributes>;

export class vingresosadministrativos extends Model<vingresosadministrativosAttributes, vingresosadministrativosCreationAttributes> implements vingresosadministrativosAttributes {
  registro?: string;
  epis_pk?: number;
  nombres!: string;
  curp!: string;
  fechacap2!: string;
  Refe!: string;
  apellido1!: string;
  apellido2!: string;
  id_segsoc?: number;
  segsoc?: string;
  Poliza?: string;
  fecha_nac?: string;
  direccion?: string;
  telefono?: string;
  id_loca?: string;
  Localidad?: string;
  id_muni?: string;
  Municipio?: string;
  id_esta?: string;
  Estado?: string;
  fechaing?: Date;
  fechaegr?: Date;
  numdias?: number;
  hrs?: string;
  cama?: string;
  CIE?: string;
  CIE_DESC?: string;
  capturo?: string;
  id_servicio?: number;
  servicio?: string;
  meding!: string;
  Fecha_Alta!: string;
  Hora_Alta!: string;
  CIE_ALTA!: string;
  CIE_DESC_ALTA!: string;
  Motivo_alta!: string;
  Motivo_alta_PK!: number;
  Destino_alta!: string;
  Destino_alta_PK!: number;
  med_alta!: string;
  id_Sexo?: number;
  sexo?: string;
  id_edocivil?: number;
  edocivil?: string;
  id_ocupa?: number;
  ocupa?: string;
  id_escol?: number;
  escol?: string;
  Procedencia?: string;
  Proc_urg?: string;
  id_proc_urg?: number;
  Pk_PISO?: string;
  PISO_DESC?: string;
  division!: string;
  id_procede?: number;
  siih?: number;
  ssj?: number;
  divi?: number;
  cod_ingreso_pk?: number;
  cod_centro?: number;
  centro?: string;
  cod_uenf_pk?: number;
  unidad_enfermeria?: string;
  codigo_cliente?: number;
  cod_pagador_evento?: number;
  nom_pagador_evento?: string;
  ing_tipo_pk?: number;
  ing_tipo_desc?: string;
  id_servicio_egr?: number;
  servicio_egreso?: string;
  'edadaños'?: number;
  EdadMeses?: number;
  EdadDias?: number;
  TURNO_INGRESO?: string;
  FOLIO?: number;
  codigopostal?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof vingresosadministrativos {
    return vingresosadministrativos.init({
    registro: {
      type: DataTypes.CHAR(15),
      allowNull: true
    },
    epis_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    nombres: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    curp: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    fechacap2: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    Refe: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    apellido1: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    apellido2: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    id_segsoc: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    segsoc: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Poliza: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    fecha_nac: {
      type: DataTypes.CHAR(11),
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    id_loca: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    Localidad: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_muni: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    Municipio: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    id_esta: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    Estado: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fechaing: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fechaegr: {
      type: DataTypes.DATE,
      allowNull: true
    },
    numdias: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hrs: {
      type: DataTypes.CHAR(11),
      allowNull: true
    },
    cama: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    CIE: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    CIE_DESC: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    capturo: {
      type: DataTypes.CHAR(64),
      allowNull: true
    },
    id_servicio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    servicio: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    meding: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    Fecha_Alta: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    Hora_Alta: {
      type: DataTypes.CHAR(5),
      allowNull: false
    },
    CIE_ALTA: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    CIE_DESC_ALTA: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Motivo_alta: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    Motivo_alta_PK: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Destino_alta: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    Destino_alta_PK: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    med_alta: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    id_Sexo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sexo: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    id_edocivil: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    edocivil: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    id_ocupa: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ocupa: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    id_escol: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    escol: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Procedencia: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Proc_urg: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    id_proc_urg: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Pk_PISO: {
      type: DataTypes.CHAR(3),
      allowNull: true
    },
    PISO_DESC: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    division: {
      type: DataTypes.STRING(1),
      allowNull: false
    },
    id_procede: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    siih: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ssj: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    divi: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cod_ingreso_pk: {
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
    cod_uenf_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    unidad_enfermeria: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    codigo_cliente: {
      type: DataTypes.INTEGER,
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
    ing_tipo_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ing_tipo_desc: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    id_servicio_egr: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    servicio_egreso: {
      type: DataTypes.STRING(128),
      allowNull: true
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
    TURNO_INGRESO: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    FOLIO: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    codigopostal: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vingresosadministrativos',
    schema: 'dbo',
    timestamps: false
  });
  }
}
