import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { AutenticadosJwtService } from 'src/app/services/autenticados-jwt.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent implements OnInit {

  loginForm: FormGroup;
  ocultarPassword: boolean = true;
 

  constructor(private router: Router, private usuarioService: UsuarioService, private autentiJwtService: AutenticadosJwtService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl ('prueba@prueba.com', [Validators.required, Validators.minLength(4)]),
      password: new FormControl ('1234', [])
    });
  }

  /**
   * 
   */
  autenticaUsuario() {
    this.usuarioService.compruebaUsuario(this.loginForm.controls.email.value,
      this.loginForm.controls.password.value).subscribe(data => {
        console.log(data);
        if (data.jwt != undefined) {
          this.autentiJwtService.almacenaJWT(data.jwt);
          this.router.navigate(['/pantallaPrincipal']);
        } 
        else {
          console.log('Datos incorrectos');
        }
    });
  }
}
