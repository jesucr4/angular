import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { competicion, instalacion, modalidad } from 'src/app/interfaces/interface';
import { CompeticionService } from 'src/app/services/competicion.service';
import { ComunicacionAlertaService } from 'src/app/services/comunicacion-alerta.service';
import { InstalacionService } from 'src/app/services/instalacion.service';

@Component({
  selector: 'app-editar-torneo',
  templateUrl: './editar-torneo.component.html',
  styleUrls: ['./editar-torneo.component.scss']
})
export class EditarTorneoComponent implements OnInit {

  form: FormGroup;
  instalacionesDeporte: instalacion[];
  competicion: competicion = null;  
  idCompeticion: number;
  idModalidad: any;
  idInstalacion: instalacion;

  constructor(
    private competicionService: CompeticionService,
    private instalacionService: InstalacionService,
    private rutaActiva : ActivatedRoute,
    private router: Router,
    private comunicacionAlertas: ComunicacionAlertaService 
  ) { }

  ngOnInit(): void {
    this.idCompeticion = this.rutaActiva.snapshot.params.id;
    this.cargarDatosCompeticion();
    
    this.form = new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      instalacion: new FormControl('',[Validators.required]),
    });
  }

  cargarDatosCompeticion(){
    this.competicionService.getCompeticion(this.idCompeticion).subscribe(competicion => {
      this.competicion = competicion;
      this.form.controls.nombre.setValue(this.competicion.nombre);
      console.log(this.competicion.nombre);
      this.form.controls.instalacion.setValue(this.competicion.idInstalacion);
      console.log(this.competicion.idInstalacion);
      this.idModalidad = this.competicion.modalidad;
      this.cargarInstalacionesDeporte();
    })
  }

  editar(){
    this.comunicacionAlertas.abrirDialogCargando();
    this.competicion.nombre = this.form.controls.nombre.value;
    this.competicion.idInstalacion = this.form.controls.instalacion.value;
    //this.competicion.modalidad = this.idModalidad;
    this.competicionService.actualizarDatosCompeticion(this.idCompeticion,this.competicion).subscribe(
      resultado => {
        if (resultado["result"] == "fail") { // Ha ocurrido algún fallo en el servidor
          this.comunicacionAlertas.abrirDialogError('Error al actualizar los datos del torneo. Inténtelo más tarde.')
        }
        else { // Todo ha ido correctamente, muestro un mensaje en pantalla para informar, me subscribo al evento de
          // cierre del mensaje y después redirijo al listado de mensajes.
          this.comunicacionAlertas.abrirDialogInfo('Torneo actualizado').subscribe(result => {
            this.volver();
          });
        }
      }
    )
  }

  volver(){
   // console.log (this.idModalidad);
    this.router.navigate(['/listadoTorneo/'+this.idModalidad.id]);
  }
  cargarInstalacionesDeporte(){
    this.instalacionesDeporte = [];
   // console.log(this.idModalidad.id);
    this.instalacionService.getNombreInstalaciones(this.idModalidad.id).subscribe(
      instalacionesDeporte => instalacionesDeporte.forEach(instalacion =>
        this.instalacionesDeporte.push(instalacion)));
  }
}
