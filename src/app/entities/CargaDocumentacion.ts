import { Tramite } from './Tramite';

export class Asegurado {
    id: number;
    nomApeAsegurado: string;
    dniAsegurado: number;
    otraPoliza: boolean;
    fallecido: boolean;
    domicilio: string;
    altura: number;
    piso: number;
    localidad: string;
    codPostal: number;
    provincia: string;
    trabajando: boolean;
    lugarAccidente: string;
    idTercero: number;
    idCapturas: number;
    idGastoSepelio: number;
    idTramite: number;

    idTramiteNavigation: Tramite;
    idTerceroNavigation: TerceraPersona;
    idGastoSepelioNavigation: GastosSepelio;
    idCapturasNavigation: Capturas;
}

export class TerceraPersona {
    id: number;
    dniTercero: number;
    nomApeTercero: string;
    nacimientoTercero: Date;
    domicilio: string;
    altura: number;
    piso: number;
    localidad: string;
    codPostal: number;
    provincia: string;
    relacionAsegurado: string;
    conocimientoAsegurado: string;
    tipoPersona: string;
    idTramite: number;

    asegurados: Asegurado[];
}

export class GastosSepelio {
    id: number;
    razonSocial: string;
    nroFactura: number;
    importe: number;
    idTramite: number;

    asegurados: Asegurado[];
}

export class Capturas {
    idCaptura: number;
    dniDelantero: File;
    dniTrasero: File;
    actaDefuncion: File;
    denunciaPolicial: File;
    facturaSepelio: File;
    estudiosMedicos: File;
    historiaClinica: File;
    idTramite: number;

    asegurados: Asegurado[];
}