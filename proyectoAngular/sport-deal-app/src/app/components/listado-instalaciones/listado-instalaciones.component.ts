import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ListadoInstalaciones, Usuario } from '../../interfaces/interface';
import { MatTableDataSource } from '@angular/material/table';
import { instalacion } from 'src/app/interfaces/interface';
import { InstalacionService } from 'src/app/services/instalacion.service';
import { from } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ComunicacionAlertaService } from 'src/app/services/comunicacion-alerta.service';
import { MatDialog } from '@angular/material/dialog';
import { NuevaInstalacionComponent } from '../nueva-instalacion/nueva-instalacion.component';
@Component({
  selector: 'app-listado-instalaciones',
  templateUrl: './listado-instalaciones.component.html',
  styleUrls: ['./listado-instalaciones.component.scss']
})
export class ListadoInstalacionesComponent implements OnInit, AfterViewInit {

  columnas: string[] = ['Nombre' , 'Imagen',  'Localidad', 'Capacidad', 'Fecha Construccion'];
  listadoInstalaciones : ListadoInstalaciones = {
    instalaciones: [],
    instalacionesTotal: 0
  };
  usuarioAutenticado : Usuario;

  tipoInstalacion: number ;
  //1->FUTBOL
  //2->BALONCESTO
  //3->TENIS
  //4->MOTOR
  
 // tipoConsulta: number;

  dataSourceTabla = new MatTableDataSource<instalacion>(this.listadoInstalaciones.instalaciones);
  constructor( private instalacionService : InstalacionService, private router: Router,
    private usuarioService : UsuarioService, private rutaActiva : ActivatedRoute ,
    private comunicacionAlertas: ComunicacionAlertaService,
    private dialog: MatDialog) { }
  ngAfterViewInit(): void {
    this.actualizaListadoInstalaciones();
  }

  ngOnInit(): void {
    this.usuarioService.getUsuarioAutenticado().subscribe(usuario => {
      if (usuario == null) { // Si no hay usuario autenticado, redirijo al login
        this.router.navigate(['/login']);
      }
      else {
        this.usuarioAutenticado = usuario;
      }
    });
    this.tipoInstalacion = this.rutaActiva.snapshot.params.id;
  
  }

  actualizaListadoInstalaciones() {
    
   // this.comunicacionAlertas.abrirDialogCargando(); // Pantalla de carga
    // Petición de instalaciones al servicio
    
    this.instalacionService.getListadoInstalaciones(this.tipoInstalacion).subscribe(data => {
      if (data["result"] == "fail") { // Algo ha fallado
        this.comunicacionAlertas.abrirDialogError('Imposible obtener los mensajes desde el servidor');
      }
      else { // Todo ha ido bien, se refresca el dataSourceTabla, con un nuevo MatTableDataSource.
        this.listadoInstalaciones = data;
        this.dataSourceTabla = new MatTableDataSource<instalacion>(this.listadoInstalaciones.instalaciones);
        this.comunicacionAlertas.cerrarDialogo();
      }
    });
  }

  cambioCompeticiones(indice) {
    if (indice == 1){
      this.actualizaListadoInstalaciones;
    }
    if (indice == 2){
      this.router.navigate(["/listadoTorneo/"+this.tipoInstalacion]);
    }
    if (indice == 0){
      this.router.navigate(["/pantallaPrincipal"]);
    }
  }  

  nuevaInstalacion() {
    this.router.navigate(['/nuevaInstalacion/'+this.tipoInstalacion]); 
  }   
}
