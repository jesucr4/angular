import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { modalidad, Usuario } from 'src/app/interfaces/interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatDialogRef } from '@angular/material/dialog';
import { InstalacionService } from 'src/app/services/instalacion.service';
import { ComunicacionAlertaService } from 'src/app/services/comunicacion-alerta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalidadService } from 'src/app/services/modalidad.service';


@Component({
  selector: 'app-nueva-instalacion',
  templateUrl: './nueva-instalacion.component.html',
  styleUrls: ['./nueva-instalacion.component.scss']
})
export class NuevaInstalacionComponent implements OnInit {
  usuarioAutenticado: Usuario = null; // Necesito obtener el usuario autenticado
  form: FormGroup; // Para el formulario reactivo
  imagen : any;
  tipoInstalacion: number ;
  //fecha: Date;

  constructor(private usuarioService: UsuarioService,
    private instalacionService: InstalacionService,
    private rutaActiva : ActivatedRoute ,
    private router : Router,
    private comunicacionAlerta : ComunicacionAlertaService,
    ) { }

  ngOnInit(): void {
    //this.usuarioService.getUsuarioAutenticado().subscribe(usuario =>
      //this.usuarioAutenticado = usuario);
     // this.fecha = new Date();
     // console.log(this.fecha);
      this.form = new FormGroup({
        nombre: new FormControl('',[Validators.required]),
        localidad: new FormControl('',[Validators.required]),
        capacidad: new FormControl('',[Validators.required]),
        f_construccion: new FormControl('',[]),
      });
      this.tipoInstalacion = this.rutaActiva.snapshot.params.id;
      //console.log(this.tipoInstalacion);

      
  }
  usuarioImagen() {
    const inputNode: any = document.querySelector('#file'); // Obtengo el control etiquetado en Angular como #file
    if (typeof (FileReader) !== 'undefined') { // tomo una precaución para comprobar que puedo utilizar el tipo FileReader
      const reader = new FileReader(); // Instancio un FileReader()
      // Pido al objeto reader que lea el primer (y único) fichero seleccionado por el control etiquetado como #file.
      // esta acción no es inmediata, es asíncrona, ya que no sabemos el tiempo que un lector de ficheros tardará en leer
      // fichero. Todo depende del tamaño del archivo.
      // Cuando el lector termine se disparará su evento "onload()", que se encuentra en este fichero, línea 112.
      reader.readAsArrayBuffer(inputNode.files[0]);
      // Cuando el objeto reader termina de leer el fichero seleccionado por el usuario, dispara su evento "onload()"
      reader.onload = (e: any) => {
        // transformo el contenido del fichero leído, en la variable "e" a una cadena de texto codificada en Base64.
        // Además lo cargo en el campo this.usuario.imagen. Esto provocará que la imagen del html cambie, ya que dicha
        // imagen muestra, en todo momento, el valor de this.usuario.imagen
        this.imagen = btoa(
          new Uint8Array(e.target.result)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      };
    }
  }

  crear(){
    //console.log(this.tipoInstalacion);
    

    this.instalacionService.crearNuevaInstalacion(this.form.controls.nombre.value,
      this.form.controls.localidad.value, this.form.controls.capacidad.value,
      this.form.controls.f_construccion.value.getTime(), this.tipoInstalacion, this.imagen).subscribe(resultado => {
        if (resultado == null) {
          this.comunicacionAlerta.mostrarSnackBar('Error al enviar el mensaje. Inténtelo más tarde.')
        }
        else {
          this.comunicacionAlerta.mostrarSnackBar('Mensaje enviado')
          this.volver();
        }
       });
    }

  volver() {
    this.router.navigate(["/listadoInstalaciones/"+this.tipoInstalacion]);
  }

}
