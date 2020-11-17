import { TipoSiniestro } from '../entities/TipoSiniestro';
import { TramiteTipoSiniestro } from '../entities/TramiteTipoSiniestro';
import { CuentaBancaria } from './CuentaBancaria';
import { Denunciante } from './Denunciante';

export class Tramite {
    id: number;
    idAsegurado: number;
    tipoSiniestro: number;
    fecha: Date;
    teléfonoProporcionado: number;
    emailDenunciante: string;
    nroTramite: number;
    estado: number;
    validado: boolean;
    nroSiniestro: number;
    nroValidacion: number;
    dniAsegurado: string;
    dniBeneficiario: string;

    // tipoSiniestroNavigation: TipoSiniestro;
    cuentaBancaria: CuentaBancaria[];
    denunciantes: Denunciante[];
    tramiteTipoSiniestro: TramiteTipoSiniestro[];
}

export class ConfirmacionTramite {
    nroTramite: number;
    isValid: boolean;
}