import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { DenunciaSiniestroComponent } from './routes/denuncia-siniestro/denuncia-siniestro.component';
import { ConsultaSiniestroComponent } from './routes/consulta-siniestro/consulta-siniestro.component';
import { PantallaPrincipalSiniestrosComponent } from './routes/pantalla-principal-siniestros/pantalla-principal-siniestros.component';
import { BreadcrumbsComponent } from './routes/breadcrumbs/breadcrumbs.component';

import { SiniestroService } from './services/siniestro.service';
import { CargaDocumentacionComponent } from './routes/carga-documentacion/carga-documentacion.component';
import { HeaderComponent } from './routes/pantalla-principal-siniestros/header/header.component';
import { FooterComponent } from './routes/pantalla-principal-siniestros/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    DenunciaSiniestroComponent,
    ConsultaSiniestroComponent,
    PantallaPrincipalSiniestrosComponent,
    BreadcrumbsComponent,
    CargaDocumentacionComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [SiniestroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
