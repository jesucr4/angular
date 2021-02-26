import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListadoInstalacionesComponent } from './components/listado-instalaciones/listado-instalaciones.component';
import { ListadoTorneoComponent } from './components/listado-torneo/listado-torneo.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { NuevaInstalacionComponent } from './components/nueva-instalacion/nueva-instalacion.component';
import { NuevoTorneoComponent } from './components/nuevo-torneo/nuevo-torneo.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginUsuarioComponent},
  {path: 'pantallaPrincipal', component: InicioComponent},
  {path: 'listadoInstalaciones/:id', component: ListadoInstalacionesComponent},
  {path: 'listadoTorneo/:id', component: ListadoTorneoComponent},
  {path: 'nuevaInstalacion/:id', component: NuevaInstalacionComponent},
  {path: 'nuevoTorneo/:id', component: NuevoTorneoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
