import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { ImageSnippet } from '../../entities/ImageSnippet';

import { Tramite } from '../../entities/Tramite';
import { SiniestroService } from '../../services/siniestro.service';
import { DatosCliente } from '../../entities/DatosCliente';
import { Asegurado, TerceraPersona } from '../../entities/CargaDocumentacion';
import { TipoSiniestro } from 'src/app/entities/TipoSiniestro';

@Component({
  selector: 'app-carga-documentacion',
  templateUrl: './carga-documentacion.component.html',
  styleUrls: ['./carga-documentacion.component.scss']
})
export class CargaDocumentacionComponent implements OnInit {

  //#region Parameters
  formStep: number = 1;
  submited: boolean;
  datosAseguradoForms: FormGroup;
  datosBeneficiario: FormGroup;
  datosCliente: DatosCliente;

  //Tercero
  terceraPersona: TerceraPersona;
  fechaNacimiento: NgbDate;

  //Asegurado
  asegurado: Asegurado;
  fechaFallecimientoAsegurado: string[];
  tipoSiniestro: string = '';
  tiposSiniestro: TipoSiniestro[] = [];
  otraPoliza: boolean;

  //Capturas
  imagenDniFront: ImageSnippet;
  imagenDniBack: ImageSnippet;
  imagenActaDefuncion: ImageSnippet;
  imagenDenunciaPolicial: ImageSnippet;

  @Input() NroTramite: number;
  @Input() Tramite: Tramite;
  //#endregion

  //#region Constructor
  constructor(private siniestroService: SiniestroService, private fb: FormBuilder) {

  }
  //#endregion

  ngOnInit() {
    this.asegurado = {} as Asegurado;
    this.terceraPersona = {} as TerceraPersona;

    this.datosAseguradoForms = this.fb.group({
      dni: ['', Validators.required],
      nombreApellido: ['', Validators.required],
      fechaFallecimiento: ['', Validators.required],
      tipoSiniestro: ['', Validators.required],
      otraPoliza: ['', Validators.required],
      tiempoConocimiento: ['', Validators.required],
      caracter: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      domicilio: ['', Validators.required],
      altura: ['', Validators.required],
      piso: ['', Validators.required],
      localidad: ['', Validators.required],
      codPostal: ['', Validators.required],
      provincia: ['', Validators.required]
    });

    this.datosBeneficiario = this.fb.group({
      dniBeneficiario: ['', Validators.required],
    });

    if (this.NroTramite != null) {
      this.getTramite(this.NroTramite);
    }
    else {
      this.getDatos(this.Tramite);
    }
  }

  submitForm() {
    this.submited = true;

    if (this.datosAseguradoForms.invalid) {
      return;
    }

    // this.saveDocumentacion();
  }

  getTramite(nroTramite: number) {
    this.siniestroService.getTramite(nroTramite)
      .subscribe(
        (res: Tramite) => {
          if (res.id != undefined || res.id != null) {
            this.Tramite = res;
            this.getDatos(this.Tramite);
          }
          else {
            alert('No existe. Mal aheee.')
          }
        }
      );
  }

  getDatos(tramite: Tramite) {
    this.siniestroService.verifyPolicy(tramite.dniAsegurado, tramite.dniBeneficiario)
      .subscribe(
        (res: any) => {
          this.datosCliente = res;

          this.terceraPersona.dniTercero = parseInt(tramite.dniBeneficiario);
          this.asegurado.dniAsegurado = parseInt(tramite.dniAsegurado);
          this.asegurado.idTramite = tramite.id;
          this.terceraPersona.idTramite = tramite.id;

          this.fechaFallecimientoAsegurado = this.Tramite.fecha.toString().split("T", 1);

          for (var tramSin of this.Tramite.tramiteTipoSiniestro) {
            this.tipoSiniestro = this.tipoSiniestro + tramSin.idTipoSiniestroNavigation.descripcion + ' ';
          }

          tramite.tramiteTipoSiniestro.forEach(element => {
            this.tiposSiniestro.push(element.idTipoSiniestroNavigation);
          });

          console.log(this.tiposSiniestro);
          this.preLoad(this.datosCliente);
        }
      );
  }

  preLoad(datosCliente: DatosCliente) {
    if (datosCliente.beneficiario != null) {
      this.terceraPersona.nomApeTercero = datosCliente.beneficiario.apellidoNombreBeneficiario;
      this.terceraPersona.relacionAsegurado = datosCliente.beneficiario.relacionAsegurado;
    }

    this.asegurado.nomApeAsegurado = datosCliente.polizasAsegurado[0].nombreTomador;
  }

  saveDocumentacion() {
    this.fechaNacimiento = this.datosAseguradoForms.get('fechaNacimiento').value;
    this.terceraPersona.nacimientoTercero = new Date(this.fechaNacimiento.year, this.fechaNacimiento.month - 1, this.fechaNacimiento.day);

    this.asegurado.idTerceroNavigation = this.terceraPersona;
    this.asegurado.otraPoliza = this.otraPoliza;

    var formData = new FormData();
    formData = this.loadFormData();

    this.siniestroService.addOrEditDocumentation(this.asegurado)
      .subscribe(
        (res: any) => {
          if (res != undefined && res != null && res.statusText === 'OK' && res.status == 200) {
            console.log('Success! (ﾉ◕ヮ◕)ﾉ*:・ﾟ✧');
            this.siniestroService.cargaImagen(formData)
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
          }
          else {
            console.log('Failed (ง •̀_•́)ง Dorime');
          }
        }
      );
    this.onClickFormStep();
  }

  //#region Proceso imágenes
  procesarDniFront(imagen: any) {
    const file: File = imagen.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.imagenDniFront = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

  procesarDniBack(imagen: any) {
    const file: File = imagen.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.imagenDniBack = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

  procesarActaDefuncion(imagen: any) {
    const file: File = imagen.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.imagenActaDefuncion = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

  loadFormData() {
    var formData = new FormData();

    if (this.imagenDniFront != undefined) {
      formData.append('image', this.imagenDniFront.file, 'DniDelantero_' + this.Tramite.id);
    }

    if (this.imagenDniBack != undefined) {
      formData.append('image', this.imagenDniBack.file, 'DniDelantero_' + this.Tramite.id);
    }

    if (this.imagenActaDefuncion != undefined) {
      formData.append('image', this.imagenActaDefuncion.file, 'DniDelantero_' + this.Tramite.id);
    }

    if (this.imagenDenunciaPolicial != undefined) {
      formData.append('image', this.imagenDenunciaPolicial.file, 'DniDelantero_' + this.Tramite.id);
    }

    return formData;
  }
  //#endregion

  //#region Steps
  onClickFormStep() {
    this.formStep++;
  }

  substractFormStep() {
    this.formStep--;
  }
  //#endregion
}