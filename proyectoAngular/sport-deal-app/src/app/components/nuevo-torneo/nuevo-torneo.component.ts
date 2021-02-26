import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { instalacion, modalidad, Usuario } from 'src/app/interfaces/interface';
import { CompeticionService } from 'src/app/services/competicion.service';
import { ComunicacionAlertaService } from 'src/app/services/comunicacion-alerta.service';
import { InstalacionService } from 'src/app/services/instalacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-nuevo-torneo',
  templateUrl: './nuevo-torneo.component.html',
  styleUrls: ['./nuevo-torneo.component.scss']
})
export class NuevoTorneoComponent implements OnInit {
  usuarioAutenticado: Usuario = null; // Necesito obtener el usuario autenticado
  form: FormGroup; // Para el formulario reactivo
  instalacionesDeporte: instalacion[];  
  tipoInstalacion: number ;
  constructor(private competicionService: CompeticionService
    ,private usuarioService: UsuarioService,
    private router: Router,
    private rutaActiva : ActivatedRoute,
    private instalacionService : InstalacionService,
    private comunicacionAlerta : ComunicacionAlertaService,) { }

  ngOnInit(): void {
    this.tipoInstalacion = this.rutaActiva.snapshot.params.id;
    this.cargarInstalacionesDeporte();
    this.usuarioService.getUsuarioAutenticado().subscribe(usuario =>
      this.usuarioAutenticado = usuario);
    this.form = new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      instalacion: new FormControl('',[]),
    });
    
    console.log(this.tipoInstalacion);
  }

  crear(){
    this.competicionService.crearNuevaInstalacion(this.form.controls.nombre.value,
      this.tipoInstalacion,this.form.controls.instalacion.value).subscribe(resultado => {
        if (resultado == null) {
          this.comunicacionAlerta.mostrarSnackBar('Error al crear el torneo. Inténtelo más tarde.')
        }
        else {
          this.comunicacionAlerta.mostrarSnackBar('Competición creada')
          this.volver();
        }
       });
  }

  volver() {
    this.router.navigate(["/listadoTorneo/"+this.tipoInstalacion]);
  }

  cargarInstalacionesDeporte(){
    this.instalacionesDeporte = [];
    this.instalacionService.getNombreInstalaciones(this.tipoInstalacion).subscribe(
      instalacionesDeporte => instalacionesDeporte.forEach(instalacion =>
        this.instalacionesDeporte.push(instalacion)));
  }

  getModalidadNombre (modalidad: modalidad){
    return modalidad.descripcion;
  }
}
