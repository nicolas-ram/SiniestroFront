import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';

import { ConfirmacionTramite, Tramite } from '../../entities/Tramite';
import { TipoSiniestro } from '../../entities/TipoSiniestro';
import { DatosCliente } from '../../entities/DatosCliente';
import { SiniestroService } from '../../services/siniestro.service';
import { TramiteTipoSiniestro } from 'src/app/entities/TramiteTipoSiniestro';

@Component({
  selector: 'app-denuncia-siniestro',
  templateUrl: './denuncia-siniestro.component.html',
  styleUrls: ['./denuncia-siniestro.component.scss']
})
export class DenunciaSiniestroComponent implements OnInit {

  //#region Parameters
  step: number = 0;
  formStep: number = 1;
  tramiteForms: FormGroup;
  userVerification: boolean;
  mailVerification: boolean = false;
  subTipoSiniestro: boolean = false;
  submited: boolean = false;
  fechaSiniestro: NgbDate;
  fechaOpcion: string;
  nroTramite: number;
  dniAsegurado: string;
  dniBeneficiario: string;
  fechaActual: Date;

  tipoSiniestro: TipoSiniestro;
  tiposSiniestro: TipoSiniestro[] = [];
  tiposMuerte: TipoSiniestro[] = [];
  tiposAccidente: TipoSiniestro[] = [];
  tiposEnfermedad: TipoSiniestro[] = [];

  selectedSiniestros: TipoSiniestro[] = [];
  tramite: Tramite;
  confirmacionTramite: ConfirmacionTramite;
  datosCliente: DatosCliente;
  //#endregion

  //#region Constructor
  constructor(private siniestroService: SiniestroService, private fb: FormBuilder) {

  }
  //#endregion

  ngOnInit() {
    this.tipoSiniestro = {} as TipoSiniestro;
    this.getDateFromService();
    this.getTypeSinester();

    this.tramiteForms = this.fb.group({
      fechaSiniestro: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      emailConfirmacion: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required]
    });
  }

  get f() {
    return this.tramiteForms.controls;
  }

  submitForm() {
    this.submited = true;

    if (this.tramiteForms.invalid) {
      alert('Hay campos sin completar.')
      return;
    }

    this.saveTramite();
  }

  getTramite(nroTramite: number) {
    this.siniestroService.getTramite(nroTramite)
      .subscribe(
        (res: Tramite) => {
          this.tramite = res;
        }
      );
  }

  selectSiniestro(typeSiniestro: TipoSiniestro) {
    this.tipoSiniestro = typeSiniestro;

    if (this.tipoSiniestro.id == 1 || this.tipoSiniestro.id == 2 || this.tipoSiniestro.id == 6 || this.tipoSiniestro.id == 7) {
      this.fechaOpcion = 'fallecimiento';
    }
    else if (this.tipoSiniestro.id == 3) {
      this.fechaOpcion = 'diagnóstico médico';
    }
    else if (this.tipoSiniestro.id == 4) {
      this.fechaOpcion = 'accidente';
    }
    else {
      this.fechaOpcion = 'robo';
    }

    this.onClickStep();
  }

  getTypeSinester() {
    this.siniestroService.getTypeSinester()
      .subscribe(
        (res: TipoSiniestro[]) => {
          res.forEach(element => {
            if (element.idPadre == null) {
              this.tiposSiniestro.push(element);
            }
            else if (element.idPadre != null) {
              if (element.idPadre == 1) {
                this.tiposMuerte.push(element);
              }
              else if (element.idPadre == 3) {
                this.tiposEnfermedad.push(element);
              }
              else if (element.idPadre == 4) {
                this.tiposAccidente.push(element);
              }
            }
          });
        }
      );
  }

  SubTipoSiniestro() {
    if (this.tipoSiniestro.id == 1 || this.tipoSiniestro.id == 3 || this.tipoSiniestro.id == 4) {
      this.subTipoSiniestro = true;
    }
    else {
      this.onClickStep();
    }
  }

  verifyPolicy() {
    if (this.dniBeneficiario == undefined || this.dniBeneficiario == "") {
      this.dniBeneficiario = null;
    }

    if (this.dniAsegurado == this.dniBeneficiario) {
      //TODO: Se reemplazaran los alert con algún toast en especial con un mensaje en específico.
      alert("Los dos campos no deben ser iguales! >:0");
    }
    else {
      this.siniestroService.verifyPolicy(this.dniAsegurado, this.dniBeneficiario)
        .subscribe(
          (res: any) => {
            this.datosCliente = res;

            if (this.datosCliente.isValid == true) {
              this.SubTipoSiniestro();
            }
            else {
              //TODO: Se reemplazaran los alert con algún toast en especial con un mensaje en específico.
              alert("No se encontró al asegurado y/o beneficiario  :'(");
            }
          }
        );
    }
  }

  nroVerificacion: number;

  MailValidation() {
    var email = this.tramiteForms.get('email').value;
    this.siniestroService.MailValidation(this.nroVerificacion, email)
      .subscribe(
        (res: any) => {
          this.confirmacionTramite = res;

          if (this.confirmacionTramite.isValid == true) {
            this.nroTramite = this.confirmacionTramite.nroTramite;
            this.mailVerification = this.confirmacionTramite.isValid;
          }
          else {
            //TODO: Se reemplazaran los alert con algún toast en especial con un mensaje en específico.
            alert('El código no es el correspondiente.');
          }
        }
      );
  }

  saveTramite() {
    let tramite: Tramite;
    tramite = {} as Tramite;
    this.fechaSiniestro = this.tramiteForms.get('fechaSiniestro').value;
    var emailConfirmacion = this.tramiteForms.get('emailConfirmacion').value;

    tramite.fecha = new Date(this.fechaSiniestro.year, this.fechaSiniestro.month - 1, this.fechaSiniestro.day);
    tramite.teléfonoProporcionado = this.tramiteForms.get('celular').value;
    tramite.emailDenunciante = this.tramiteForms.get('email').value;
    tramite.dniAsegurado = this.dniAsegurado;
    tramite.dniBeneficiario = this.dniBeneficiario;

    let selection: TramiteTipoSiniestro[] = [];

    for (var siniestro of this.selectedSiniestros) {
      let tts: TramiteTipoSiniestro;
      tts = {} as TramiteTipoSiniestro;

      tts.idTipoSiniestro = siniestro.id;
      selection.push(tts);
    }

    tramite.tramiteTipoSiniestro = selection;

    if (tramite.emailDenunciante != emailConfirmacion) {
      //TODO: Se reemplazaran los alert con algún toast en especial con un mensaje en específico.
      alert('El email proporcionado es distinto al mail confirmado');
    }
    else {
      this.siniestroService.addOrEditTramite(tramite)
        .subscribe(
          (res: any) => {
            if (res != undefined && res != null && res.statusText === 'OK' && res.status == 200) {
              console.log('Success! (ﾉ◕ヮ◕)ﾉ*:・ﾟ✧');
            }
            else {
              console.log('Failed (ง •̀_•́)ง Dorime');
            }
          }
        );
      this.onClickStep();
    }
  }

  //#region Métodos piolas
  loadSiniestros(tipoSiniestro: TipoSiniestro) {
    const index = this.selectedSiniestros.indexOf(tipoSiniestro, 0);

    if (index > -1) {
      this.selectedSiniestros.splice(index, 1);
    }
    else {
      this.selectedSiniestros.push(tipoSiniestro);
    }
  }

  selectSingleSiniestro(tipoSiniestro: TipoSiniestro) {
    this.loadSiniestros(tipoSiniestro);

    this.tipoSiniestro = tipoSiniestro;
    this.onClickStep();
  }

  validateDate() {
    this.fechaSiniestro = this.tramiteForms.get('fechaSiniestro').value;

    let fecha: Date;
    fecha = {} as Date;

    fecha = new Date(this.fechaSiniestro.year, this.fechaSiniestro.month - 1, this.fechaSiniestro.day);

    if (fecha > this.fechaActual) {
      alert('La fecha ingresada es mayor a la fecha actual.');
    }
    else {
      this.onClickStep();
    }
  }

  getDateFromService() {
    this.siniestroService.getTime()
      .subscribe((res: any) => {
        this.fechaActual = new Date(Date.parse(res));
      });
  }

  initialPage() {
    window.location.reload();
  }
  //#endregion

  //#region Force Characters
  numbersOnly(event): boolean {
    //TODO: ver reemplazo de keyCode y wich por key
    const charCode = (event.wich) ? event.wich : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode < 95 && charCode != 110
      && charCode != 107 && charCode != 109 && charCode != 106 && charCode != 111) {
      return false;
    }

    return true;
  }

  lettersOnly(event) {
    let e = <KeyboardEvent>event;
    //TODO: ver reemplazo de keyCode y wich por key
    if ([46, 8, 9].indexOf(e.keyCode) !== -1 ||
      (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
      (e.keyCode === 32) ||
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      return;
    }

    if (e.keyCode >= 65 && e.keyCode <= 90) {
      return;
    }

    e.preventDefault();
  }
  //#endregion

  //#region Steps
  onClickStep() {
    this.step++;
  }

  substractStep() {
    if (this.subTipoSiniestro == true) {
      this.subTipoSiniestro = false;
    }
    else {
      this.step--;
    }
    // this.step--;
    // this.subTipoSiniestro = false;
    // console.log(this.step);
  }
  //#endregion
}