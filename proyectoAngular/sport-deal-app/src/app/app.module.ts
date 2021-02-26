import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { BarraHerramientasComponent } from './components/barra-herramientas/barra-herramientas.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InicioComponent } from './components/inicio/inicio.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ListadoInstalacionesComponent } from './components/listado-instalaciones/listado-instalaciones.component';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { CuadroDialogoComponent } from './components/cuadro-dialogo/cuadro-dialogo.component';
import { ImagenInstalacionComponent } from './components/imagen-instalacion/imagen-instalacion.component';
import { ListadoTorneoComponent } from './components/listado-torneo/listado-torneo.component';


registerLocaleData(localeEs, 'es');


@NgModule({
  declarations: [
    AppComponent,
    LoginUsuarioComponent,
    BarraHerramientasComponent,
    FooterComponent,
    InicioComponent,
    ListadoInstalacionesComponent,
    CuadroDialogoComponent,
    ImagenInstalacionComponent,
    ListadoTorneoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatGridListModule,
    MatTableModule,
    MatTabsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}, {provide:LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { }

