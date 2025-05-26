import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface vcirugiasrealizadasAttributes {
  ci_inter_pk?: number;
  qrf_cirprog_pk: number;
  registro?: string;
  codigo_cliente?: number;
  Quirofano?: string;
  nombrecom?: string;
  fecha_nac?: Date;
  domicilio?: string;
  nombre_sexo?: string;
  apellido1?: string;
  apellido2?: string;
  nombre?: string;
  estado?: string;
  codigo_estado?: string;
  codigo_municipio?: string;
  municipio?: string;
  codigo_localidad?: string;
  localidad?: string;
  codigo_colonia?: string;
  colonia?: string;
  activa_sn?: number;
  idsegsoc1?: number;
  segsoc1?: string;
  segpop?: string;
  curp?: string;
  estado_civil?: string;
  profesion?: string;
  icd_cod?: string;
  icd_nom?: string;
  Icd_libre?: string;
  Cama?: string;
  CX?: string;
  Tipo_Anestesia?: string;
  Tipo_Cirugia?: string;
  Urgencia?: string;
  Clasificacion_Cx?: string;
  Destino?: string;
  Cirujano?: string;
  Anestesiologo?: string;
  Radiologo?: string;
  servicio?: string;
  Centro?: number;
  Fecha_llegada?: string;
  Hora_llegada?: string;
  Fecha_entradaqrf?: string;
  Hora_entradaqrf?: string;
  Fecha_salidaqrf?: string;
  Hora_salidaqrf?: string;
  fecha_Salidabloque?: string;
  Hora_salidabloque?: string;
  Observaciones?: string;
  cod_procedimiento?: string;
  Procedimiento?: string;
  qrf_proced_libre?: string;
  cod_ingreso_pk?: number;
  epis_pk?: number;
  tipo_anestesia_pk?: number;
  med_alta: string;
  curpresponsable: string;
  rudresponsable: string;
  nombreresponsable: string;
  primerapellidoresponsable: string;
  segundoapellidoresponsable: string;
  cedularesponsable?: string;
  tipo_episodio_pk?: number;
  centro_siglas?: string;
  ejercicio?: number;
  fechacir?: string;
  QX?: string;
}

export type vcirugiasrealizadasOptionalAttributes = "ci_inter_pk" | "registro" | "codigo_cliente" | "Quirofano" | "nombrecom" | "fecha_nac" | "domicilio" | "nombre_sexo" | "apellido1" | "apellido2" | "nombre" | "estado" | "codigo_estado" | "codigo_municipio" | "municipio" | "codigo_localidad" | "localidad" | "codigo_colonia" | "colonia" | "activa_sn" | "idsegsoc1" | "segsoc1" | "segpop" | "curp" | "estado_civil" | "profesion" | "icd_cod" | "icd_nom" | "Icd_libre" | "Cama" | "CX" | "Tipo_Anestesia" | "Tipo_Cirugia" | "Urgencia" | "Clasificacion_Cx" | "Destino" | "Cirujano" | "Anestesiologo" | "Radiologo" | "servicio" | "Centro" | "Fecha_llegada" | "Hora_llegada" | "Fecha_entradaqrf" | "Hora_entradaqrf" | "Fecha_salidaqrf" | "Hora_salidaqrf" | "fecha_Salidabloque" | "Hora_salidabloque" | "Observaciones" | "cod_procedimiento" | "Procedimiento" | "qrf_proced_libre" | "cod_ingreso_pk" | "epis_pk" | "tipo_anestesia_pk" | "cedularesponsable" | "tipo_episodio_pk" | "centro_siglas" | "ejercicio" | "fechacir" | "QX";
export type vcirugiasrealizadasCreationAttributes = Optional<vcirugiasrealizadasAttributes, vcirugiasrealizadasOptionalAttributes>;

export class vcirugiasrealizadas extends Model<vcirugiasrealizadasAttributes, vcirugiasrealizadasCreationAttributes> implements vcirugiasrealizadasAttributes {
  ci_inter_pk?: number;
  qrf_cirprog_pk!: number;
  registro?: string;
  codigo_cliente?: number;
  Quirofano?: string;
  nombrecom?: string;
  fecha_nac?: Date;
  domicilio?: string;
  nombre_sexo?: string;
  apellido1?: string;
  apellido2?: string;
  nombre?: string;
  estado?: string;
  codigo_estado?: string;
  codigo_municipio?: string;
  municipio?: string;
  codigo_localidad?: string;
  localidad?: string;
  codigo_colonia?: string;
  colonia?: string;
  activa_sn?: number;
  idsegsoc1?: number;
  segsoc1?: string;
  segpop?: string;
  curp?: string;
  estado_civil?: string;
  profesion?: string;
  icd_cod?: string;
  icd_nom?: string;
  Icd_libre?: string;
  Cama?: string;
  CX?: string;
  Tipo_Anestesia?: string;
  Tipo_Cirugia?: string;
  Urgencia?: string;
  Clasificacion_Cx?: string;
  Destino?: string;
  Cirujano?: string;
  Anestesiologo?: string;
  Radiologo?: string;
  servicio?: string;
  Centro?: number;
  Fecha_llegada?: string;
  Hora_llegada?: string;
  Fecha_entradaqrf?: string;
  Hora_entradaqrf?: string;
  Fecha_salidaqrf?: string;
  Hora_salidaqrf?: string;
  fecha_Salidabloque?: string;
  Hora_salidabloque?: string;
  Observaciones?: string;
  cod_procedimiento?: string;
  Procedimiento?: string;
  qrf_proced_libre?: string;
  cod_ingreso_pk?: number;
  epis_pk?: number;
  tipo_anestesia_pk?: number;
  med_alta!: string;
  curpresponsable!: string;
  rudresponsable!: string;
  nombreresponsable!: string;
  primerapellidoresponsable!: string;
  segundoapellidoresponsable!: string;
  cedularesponsable?: string;
  tipo_episodio_pk?: number;
  centro_siglas?: string;
  ejercicio?: number;
  fechacir?: string;
  QX?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof vcirugiasrealizadas {
    return vcirugiasrealizadas.init({
    ci_inter_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    qrf_cirprog_pk: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    registro: {
      type: DataTypes.CHAR(15),
      allowNull: true
    },
    codigo_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Quirofano: {
      type: DataTypes.STRING(60),
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
    domicilio: {
      type: DataTypes.CHAR(150),
      allowNull: true
    },
    nombre_sexo: {
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
    estado: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    codigo_estado: {
      type: DataTypes.STRING(5),
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
    activa_sn: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    idsegsoc1: {
      type: DataTypes.INTEGER,
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
    estado_civil: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    profesion: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    icd_cod: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    icd_nom: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Icd_libre: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Cama: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    CX: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Tipo_Anestesia: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Tipo_Cirugia: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Urgencia: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Clasificacion_Cx: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Destino: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    Cirujano: {
      type: DataTypes.STRING(302),
      allowNull: true
    },
    Anestesiologo: {
      type: DataTypes.STRING(302),
      allowNull: true
    },
    Radiologo: {
      type: DataTypes.STRING(302),
      allowNull: true
    },
    servicio: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    Centro: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Fecha_llegada: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    Hora_llegada: {
      type: DataTypes.CHAR(5),
      allowNull: true
    },
    Fecha_entradaqrf: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    Hora_entradaqrf: {
      type: DataTypes.CHAR(5),
      allowNull: true
    },
    Fecha_salidaqrf: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    Hora_salidaqrf: {
      type: DataTypes.CHAR(5),
      allowNull: true
    },
    fecha_Salidabloque: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    Hora_salidabloque: {
      type: DataTypes.CHAR(5),
      allowNull: true
    },
    Observaciones: {
      type: DataTypes.STRING(8000),
      allowNull: true
    },
    cod_procedimiento: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    Procedimiento: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    qrf_proced_libre: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cod_ingreso_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    epis_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tipo_anestesia_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    med_alta: {
      type: DataTypes.STRING(30),
      allowNull: false
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
    tipo_episodio_pk: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    centro_siglas: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    ejercicio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fechacir: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    QX: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vcirugiasrealizadas',
    schema: 'dbo',
    timestamps: false
  });
  }
}
