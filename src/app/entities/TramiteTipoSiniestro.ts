import { Tramite } from '../entities/Tramite';
import { TipoSiniestro } from '../entities/TipoSiniestro';

export class TramiteTipoSiniestro {
    id: number;
    idTramite: number;
    idTipoSiniestro: number;

    idTramiteNavigation: Tramite;
    idTipoSiniestroNavigation: TipoSiniestro;
}