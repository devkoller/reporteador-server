import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface vurgenciasAttributes {
  Fechaing?: Date;
  foliounico?: number;
  codigo_cliente?: number;
  registro?: string;
  nombrecom?: string;
  apepat?: string;
  apemat?: string;
  nombre?: string;
  fecha_nac?: Date;
  sexo?: string;
  clave_estado_residencia?: string;
  estado_residencia?: string;
  clave_municipio_residencia?: string;
  nombre_municipio_residencia?: string;
  clave_localidad_residencia?: string;
  nombre_localidad_residencia?: string;
  entidadNacimiento?: string;
  curp?: string;
  codigoPostal?: string;
  tipovialidad?: string;
  tipo_via?: string;
  nombreVialidad?: string;
  numeroexterior?: string;
  numerointerior?: string;
  tipoasentamiento?: number;
  tipo_asentamiento?: string;
  nombreasentamiento?: string;
  telefono?: string;
  PrimeraVez?: number;
  cdiag_ing?: string;
  fechaate?: Date;
  fechaegr?: Date;
  triage_pk?: number;
  cdiag_egr?: string;
  diag_egr?: string;
  motivo_urg_libre?: string;
  RUD?: string;
  NombreMedico?: string;
  curpresponsable: string;
  rudresponsable: string;
  nombreresponsable: string;
  primerapellidoresponsable: string;
  segundoapellidoresponsable: string;
  cedularesponsable?: string;
  codigo_personal?: number;
  destino_urg_pk?: number;
  destino_urgencias?: string;
  procedencia?: string;
  desc_area?: string;
  area?: number;
  triage_codigo?: string;
  tipo_urgencia?: string;
  folio: number;
  seguridad_social?: string;
  codigo_seguridad_social?: number;
  cedula?: string;
  codigo_servicio_ingreso?: number;
  servicio_ingreso?: string;
  entrada_fecha?: Date;
  salida_fecha?: Date;
  origen_urgencia_pk?: number;
  id_urgencia: number;
  motivo_urgencia_pk?: number;
  motivo_urgencia?: string;
  motivo_alta_pk?: number;
  cod_centro?: number;
  centro?: string;
  TURNO?: string;
  cod_cama?: string;
  Pk_PISO?: number;
  PISO_DESC?: string;
  cod_uenf_pk?: number;
  unidad_enfermeria?: string;
  idpaisorigen?: string;
  paisorigen?: string;
  diag_ing?: string;
  epis_pk?: number;
  cod_pagador_evento?: number;
  nom_pagador_evento?: string;
  localizacion_pk?: number;
  localizacion?: string;
  login_registro?: string;
  usuario_registro?: string;
  categoria_registro?: string;
  login_alta_admva?: string;
  usuario_alta_admva?: string;
  categoria_alta_admva?: string;
  login_triage?: string;
  usuario_triage?: string;
  categoria_triage?: string;
  fechatri?: Date;
  fechamed?: Date;
  triage_fecha?: Date;
  altamed_fecha?: Date;
  atencion_fecha?: Date;
  'edadaños'?: number;
  EdadMeses?: number;
  EdadDias?: number;
  triage_desc?: string;
}

export type vurgenciasOptionalAttributes = "Fechaing" | "foliounico" | "codigo_cliente" | "registro" | "nombrecom" | "apepat" | "apemat" | "nombre" | "fecha_nac" | "sexo" | "clave_estado_residencia" | "estado_residencia" | "clave_municipio_residencia" | "nombre_municipio_residencia" | "clave_localidad_residencia" | "nombre_localidad_residencia" | "entidadNacimiento" | "curp" | "codigoPostal" | "tipovialidad" | "tipo_via" | "nombreVialidad" | "numeroexterior" | "numerointerior" | "tipoasentamiento" | "tipo_asentamiento" | "nombreasentamiento" | "telefono" | "PrimeraVez" | "cdiag_ing" | "fechaate" | "fechaegr" | "triage_pk" | "cdiag_egr" | "diag_egr" | "motivo_urg_libre" | "RUD" | "NombreMedico" | "cedularesponsable" | "codigo_personal" | "destino_urg_pk" | "destino_urgencias" | "procedencia" | "desc_area" | "area" | "triage_codigo" | "tipo_urgencia" | "seguridad_social" | "codigo_seguridad_social" | "cedula" | "codigo_servicio_ingreso" | "servicio_ingreso" | "entrada_fecha" | "salida_fecha" | "origen_urgencia_pk" | "motivo_urgencia_pk" | "motivo_urgencia" | "motivo_alta_pk" | "cod_centro" | "centro" | "TURNO" | "cod_cama" | "Pk_PISO" | "PISO_DESC" | "cod_uenf_pk" | "unidad_enfermeria" | "idpaisorigen" | "paisorigen" | "diag_ing" | "epis_pk" | "cod_pagador_evento" | "nom_pagador_evento" | "localizacion_pk" | "localizacion" | "login_registro" | "usuario_registro" | "categoria_registro" | "login_alta_admva" | "usuario_alta_admva" | "categoria_alta_admva" | "login_triage" | "usuario_triage" | "categoria_triage" | "fechatri" | "fechamed" | "triage_fecha" | "altamed_fecha" | "atencion_fecha" | "edadaños" | "EdadMeses" | "EdadDias" | "triage_desc";
export type vurgenciasCreationAttributes = Optional<vurgenciasAttributes, vurgenciasOptionalAttributes>;

export class vurgencias extends Model<vurgenciasAttributes, vurgenciasCreationAttributes> implements vurgenciasAttributes {
  Fechaing?: Date;
  foliounico?: number;
  codigo_cliente?: number;
  registro?: string;
  nombrecom?: string;
  apepat?: string;
  apemat?: string;
  nombre?: string;
  fecha_nac?: Date;
  sexo?: string;
  clave_estado_residencia?: string;
  estado_residencia?: string;
  clave_municipio_residencia?: string;
  nombre_municipio_residencia?: string;
  clave_localidad_residencia?: string;
  nombre_localidad_residencia?: string;
  entidadNacimiento?: string;
  curp?: string;
  codigoPostal?: string;
  tipovialidad?: string;
  tipo_via?: string;
  nombreVialidad?: string;
  numeroexterior?: string;
  numerointerior?: string;
  tipoasentamiento?: number;
  tipo_asentamiento?: string;
  nombreasentamiento?: string;
  telefono?: string;
  PrimeraVez?: number;
  cdiag_ing?: string;
  fechaate?: Date;
  fechaegr?: Date;
  triage_pk?: number;
  cdiag_egr?: string;
  diag_egr?: string;
  motivo_urg_libre?: string;
  RUD?: string;
  NombreMedico?: string;
  curpresponsable!: string;
  rudresponsable!: string;
  nombreresponsable!: string;
  primerapellidoresponsable!: string;
  segundoapellidoresponsable!: string;
  cedularesponsable?: string;
  codigo_personal?: number;
  destino_urg_pk?: number;
  destino_urgencias?: string;
  procedencia?: string;
  desc_area?: string;
  area?: number;
  triage_codigo?: string;
  tipo_urgencia?: string;
  folio!: number;
  seguridad_social?: string;
  codigo_seguridad_social?: number;
  cedula?: string;
  codigo_servicio_ingreso?: number;
  servicio_ingreso?: string;
  entrada_fecha?: Date;
  salida_fecha?: Date;
  origen_urgencia_pk?: number;
  id_urgencia!: number;
  motivo_urgencia_pk?: number;
  motivo_urgencia?: string;
  motivo_alta_pk?: number;
  cod_centro?: number;
  centro?: string;
  TURNO?: string;
  cod_cama?: string;
  Pk_PISO?: number;
  PISO_DESC?: string;
  cod_uenf_pk?: number;
  unidad_enfermeria?: string;
  idpaisorigen?: string;
  paisorigen?: string;
  diag_ing?: string;
  epis_pk?: number;
  cod_pagador_evento?: number;
  nom_pagador_evento?: string;
  localizacion_pk?: number;
  localizacion?: string;
  login_registro?: string;
  usuario_registro?: string;
  categoria_registro?: string;
  login_alta_admva?: string;
  usuario_alta_admva?: string;
  categoria_alta_admva?: string;
  login_triage?: string;
  usuario_triage?: string;
  categoria_triage?: string;
  fechatri?: Date;
  fechamed?: Date;
  triage_fecha?: Date;
  altamed_fecha?: Date;
  atencion_fecha?: Date;
  'edadaños'?: number;
  EdadMeses?: number;
  EdadDias?: number;
  triage_desc?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof vurgencias {
    return vurgencias.init({
    Fechaing: {
      type: DataTypes.DATE,
      allowNull: true
    },
    foliounico: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    codigo_cliente: {
      type: DataTypes.INTEGER,
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
    apepat: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    apemat: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    nombre: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    fecha_nac: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sexo: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    clave_estado_residencia: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    estado_residencia: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    clave_municipio_residencia: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    nombre_municipio_residencia: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    clave_localidad_residencia: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    nombre_localidad_residencia: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    entidadNacimiento: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    curp: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    codigoPostal: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    tipovialidad: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    tipo_via: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    nombreVialidad: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    numeroexterior: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    numerointerior: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tipoasentamiento: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tipo_asentamiento: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nombreasentamiento: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    PrimeraVez: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    cdiag_ing: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    fechaate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fechaegr: {
      type: DataTypes.DATE,
      allowNull: true
    },
    triage_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cdiag_egr: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    diag_egr: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    motivo_urg_libre: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    RUD: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    NombreMedico: {
      type: DataTypes.STRING(302),
      allowNull: true
    },
    curpresponsable: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    rudresponsable: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    nombreresponsable: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    primerapellidoresponsable: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    segundoapellidoresponsable: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    cedularesponsable: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    codigo_personal: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    destino_urg_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    destino_urgencias: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    procedencia: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    desc_area: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    area: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    triage_codigo: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    tipo_urgencia: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    folio: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    seguridad_social: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    codigo_seguridad_social: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cedula: {
      type: DataTypes.CHAR(40),
      allowNull: true
    },
    codigo_servicio_ingreso: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    servicio_ingreso: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    entrada_fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    salida_fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    origen_urgencia_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_urgencia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    motivo_urgencia_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    motivo_urgencia: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    motivo_alta_pk: {
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
    TURNO: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    cod_cama: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    Pk_PISO: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PISO_DESC: {
      type: DataTypes.CHAR(30),
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
    idpaisorigen: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    paisorigen: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    diag_ing: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    epis_pk: {
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
    localizacion_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    localizacion: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    login_registro: {
      type: DataTypes.CHAR(64),
      allowNull: true
    },
    usuario_registro: {
      type: DataTypes.STRING(302),
      allowNull: true
    },
    categoria_registro: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    login_alta_admva: {
      type: DataTypes.CHAR(64),
      allowNull: true
    },
    usuario_alta_admva: {
      type: DataTypes.STRING(302),
      allowNull: true
    },
    categoria_alta_admva: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    login_triage: {
      type: DataTypes.CHAR(64),
      allowNull: true
    },
    usuario_triage: {
      type: DataTypes.STRING(302),
      allowNull: true
    },
    categoria_triage: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    fechatri: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fechamed: {
      type: DataTypes.DATE,
      allowNull: true
    },
    triage_fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    altamed_fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    atencion_fecha: {
      type: DataTypes.DATE,
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
    triage_desc: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vurgencias',
    schema: 'dbo',
    timestamps: false
  });
  }
}
