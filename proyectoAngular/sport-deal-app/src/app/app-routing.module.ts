import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListadoInstalacionesComponent } from './components/listado-instalaciones/listado-instalaciones.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginUsuarioComponent},
  {path: 'pantallaPrincipal', component: InicioComponent},
  {path: 'listadoInstalaciones/:id', component: ListadoInstalacionesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
