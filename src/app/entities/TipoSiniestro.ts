import { Tramite } from '../entities/Tramite';

export class TipoSiniestro {
    id: number;
    tipo: string;
    descripcion: string;
    idPadre: number;

    tramites: Tramite[];
}