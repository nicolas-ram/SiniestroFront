import { Tramite } from '../entities/Tramite';

export class Denunciante {
    id: number;
    idTramite: number;
    dni: number;
    nombreCompleto: string;
    fechaNacimiento: Date;
    domicilio: string;
    altura: number;
    piso: number;
    localidad: string;
    codigoPostal: number;
    provincia: string;
    dniAdjunto: File; //TODO: reemplazar por el tipo correspondiente.

    idTramiteNavigation: Tramite;
}