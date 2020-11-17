export class DatosCliente {
    polizasAsegurado: Array<Asegurado>;
    beneficiario: Beneficiario;
    isValid: boolean;
}

export class Asegurado {
    estado: string;
    fechaEmision: string;
    idProducto: string;
    idTomador: string;
    nombreProducto: string;
    nombreTomador: string;
    nroPagina: string;
    numeroPoliza: string;
    tipoPoliza: string;
    totalReg: number
}

export class Beneficiario {
    apellidoBeneficiario: string
    apellidoNombreBeneficiario: string
    idParentesco: string
    idTipoDoc: string
    idTipoParentesco: string
    nombreAsegurado: string
    nombreBeneficiario: string
    numeroDoc: string
    porcentaje: string
    relacionAsegurado: string
    tipoDoc: string
    tipoParentesco: string
}