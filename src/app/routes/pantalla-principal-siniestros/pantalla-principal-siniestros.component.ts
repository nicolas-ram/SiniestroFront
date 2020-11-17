import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pantalla-principal-siniestros',
  templateUrl: './pantalla-principal-siniestros.component.html',
  styleUrls: ['./pantalla-principal-siniestros.component.scss']
})
export class PantallaPrincipalSiniestrosComponent implements OnInit {

  option: string = null;
  constructor() { }

  ngOnInit(): void {
  }

  denunciaOption(op: string) {
    this.option = op;
  }

}
