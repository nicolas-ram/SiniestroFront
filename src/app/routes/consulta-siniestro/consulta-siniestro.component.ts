import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { SiniestroService } from '../../services/siniestro.service';
import { Tramite } from '../../entities/Tramite';

@Component({
  selector: 'app-consulta-siniestro',
  templateUrl: './consulta-siniestro.component.html',
  styleUrls: ['./consulta-siniestro.component.scss']
})
export class ConsultaSiniestroComponent implements OnInit {

  //#region Parameters
  estadoTramite: number;
  nroTramite: number;
  tramite: Tramite;
  //#endregion

  //#region Constructor
  constructor(private siniestroService: SiniestroService, private fb: FormBuilder) {

  }
  //#endregion

  ngOnInit() {

  }

  EstadoTramite(nroTramite: number) {
    this.siniestroService.getTramite(nroTramite)
      .subscribe(
        (res: Tramite) => {
          if (res != undefined || res != null) {
            this.tramite = res;
            this.estadoTramite = this.tramite.estado;
          }
          else {
            alert('No existe. Mal aheee.')
          }
        }
      );
  }

  initialPage() {
    window.location.reload();
  }
}