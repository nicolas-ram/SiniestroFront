import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Tramite } from '../entities/Tramite';
import { TipoSiniestro } from '../entities/TipoSiniestro';
import { CuentaBancaria } from '../entities/CuentaBancaria';
import { environment } from '../../environments/environment';
import { Asegurado } from '../entities/CargaDocumentacion';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8;',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
  })
};

@Injectable({
  providedIn: 'root'
})
export class SiniestroService {

  urlSiniestros = environment.urlSiniestrosService;
  ControllerSiniestro = 'Siniestro/';
  ControllerDate = 'Time/';

  constructor(protected http: HttpClient) { }

  getTramite(nroTramite: number): Observable<Tramite> {
    var subPath = 'GetTramite/';

    return this.http.get<any>(this.urlSiniestros
      .concat(this.ControllerSiniestro)
      .concat(subPath) + nroTramite,
      httpOptions)
      .pipe(
        catchError(this.handleError('GetTramite', []))
      );
  }

  getTypeSinester(): Observable<TipoSiniestro[]> {
    var subPath = 'GetTypeSinester';

    return this.http.get<TipoSiniestro[]>(this.urlSiniestros
      .concat(this.ControllerSiniestro)
      .concat(subPath),
      httpOptions)
      .pipe(
        catchError(this.handleError('GetTypeSinester', []))
      );
  }

  MailValidation(nroVerificacion: number, email: string): Observable<any> {
    var subPath = 'MailValidation/';

    return this.http.get<any>(this.urlSiniestros
      .concat(this.ControllerSiniestro)
      .concat(subPath)
      .concat(nroVerificacion + ',' + email),
      httpOptions)
      .pipe(
        catchError(this.handleError('MailValidation', []))
      );
  }

  verifyPolicy(dniAsegurado: string, dniBeneficiario: string): Observable<any[]> {
    var Path = 'VerifyPolicy/';

    return this.http.get<any[]>(this.urlSiniestros
      .concat(this.ControllerSiniestro)
      .concat(Path)
      .concat(dniAsegurado + ',' + dniBeneficiario),
      httpOptions)
      .pipe(
        catchError(this.handleError('VerifyPolicy', []))
      );
  }

  addOrEditTramite(tramite: Tramite): Observable<any> {
    var Path = 'AddOrEditTramite';

    return this.http.post<any>(this.urlSiniestros
      .concat(this.ControllerSiniestro)
      .concat(Path),
      tramite,
      {
        headers: httpOptions.headers,
        observe: 'response'
      })
      .pipe(
        catchError(this.handleError('AddOrEditTramite', []))
      );
  }

  addOrEditCBU(cuentaBancaria: CuentaBancaria): Observable<any> {
    var Path = 'AddOrEditCBU';

    return this.http.post<any>(this.urlSiniestros
      .concat(this.ControllerSiniestro)
      .concat(Path),
      cuentaBancaria,
      {
        headers: httpOptions.headers,
        observe: 'response'
      })
      .pipe(
        catchError(this.handleError('AddOrEditCBU', []))
      );
  }

  addOrEditDocumentation(cargaDocumentacion: Asegurado): Observable<any> {
    var Path = 'AddOrEditDocumentation';

    return this.http.post<any>(this.urlSiniestros
      .concat(this.ControllerSiniestro)
      .concat(Path),
      cargaDocumentacion,
      {
        headers: httpOptions.headers,
        observe: 'response'
      })
      .pipe(
        catchError(this.handleError('AddOrEditDocumentation', []))
      );
  }

  public cargaImagen(image: FormData): Observable<any> {
    var Path = 'AddImage';

    return this.http.post(this.urlSiniestros
      .concat(this.ControllerSiniestro)
      .concat(Path),
      image)
      .pipe(
        catchError(this.handleError('AddImage', []))
      );
  }

  sendVerificationMail(email: string): Observable<any> {
    var Path = 'SendVerificationMail';

    return this.http.post<any>(this.urlSiniestros
      .concat(this.ControllerSiniestro)
      .concat(Path),
      email,
      {
        headers: httpOptions.headers,
        observe: 'response'
      })
      .pipe(
        catchError(this.handleError('SendVerificationMail', []))
      );
  }

  getTime(): Observable<any> {
    var Path = 'GetDate';

    return this.http.get<any>(this.urlSiniestros
      .concat(this.ControllerDate)
      .concat(Path),
      httpOptions)
      .pipe(
        catchError(this.handleError('GetDate', []))
      )
  }

  //#region Handle Error
  //TODO: Mover todo a un BaseService que se extienda a esta clase
  /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      //return of(result as T);
      return of(error);
    };
  }

  /** Log a BaseService message */
  public log(message: string) {
    console.log(`BaseService: ${message}`);
  }
  //#endregion
}
