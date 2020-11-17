import { Tramite } from '../entities/Tramite';

export class CuentaBancaria {
    id: number;
    idTramite: number;
    banco: string;
    tipoCuenta: string;
    cbu: number;
    nombreTitular: string;
    apellido: string;
    constanciaAdjunto: File;

    idTramiteNavigation: Tramite;
}