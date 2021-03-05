import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticadosJwtService } from 'src/app/services/autenticados-jwt.service';
import { ComunicacionAlertaService } from 'src/app/services/comunicacion-alerta.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-barra-herramientas',
  templateUrl: './barra-herramientas.component.html',
  styleUrls: ['./barra-herramientas.component.scss']
})
export class BarraHerramientasComponent implements OnInit {

  constructor(private comunicacionAlertasService: ComunicacionAlertaService,
    private autenticacionPorJWT: AutenticadosJwtService,
    private router: Router,
   ) { }

  ngOnInit(): void {
  }

  menuInicio(){
    this.router.navigate(["/pantallaPrincipal"]);
  }

  menuLogin(){
    this.router.navigate(["/login"]);
  }

  confirmacionAbandonarSesion() {
    
        this.autenticacionPorJWT.eliminaJWT();
       
        this.router.navigate(['/login']);
  }
    

}
