import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DatosConJwt, Usuario } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioAutenticado : Usuario;
  @Output()
  cambiosEnUsuarioAutenticado = new EventEmitter<Usuario>();

  constructor( private http: HttpClient) { }


  compruebaUsuario (email: string, password: string) : Observable<DatosConJwt>{
    var jsonObject = {
      email: email,  // Utilizo el id de los campos del formulario
      password: password
    };

    return this.http.post<DatosConJwt>('/usuario/datos',jsonObject).pipe(
      tap(data => {
        console.log('desde tap miro los datos recibidos: ' + data["jwt"]);
      })
    );
  }

  getUsuarioAutenticado(incluirImagen: boolean = false): Observable<Usuario> {
    // Petición para obtener el usuario autenticado, funcionará porque se envía el JWT en 
    // cada petición, gracias al HttpInterceptor
    return this.http.get<Usuario>('/usuario/getAutenticado?imagen=' + incluirImagen)
    .pipe(
      tap(usuarioAutenticado => {
        // En la condición del if intento detectar varios casos que provocan un cambio en 
        // el usuario autenticado
        if ( (this.usuarioAutenticado == null && usuarioAutenticado != null) || // No había usuario autenticado y ahora sí lo hay - Autenticación
          (this.usuarioAutenticado != null && usuarioAutenticado == null) ||  // Había usuario autenticado y ya no lo hay - Cierre de sesión
          (this.usuarioAutenticado != null && usuarioAutenticado == null && this.usuarioAutenticado.id != usuarioAutenticado.id) ) { // Cambio de usuario autenticado
            this.emitirNuevoCambioEnUsuarioAutenticado();
            this.usuarioAutenticado = usuarioAutenticado;
          }
      })
    );
  }

  emitirNuevoCambioEnUsuarioAutenticado () {
    this.getUsuarioAutenticado(true).subscribe(usuarioAutenticado => {
      this.cambiosEnUsuarioAutenticado.emit(usuarioAutenticado);
    });
  }
}
