import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { competicion, instalacion, ListadoCompeticiones, modalidad, Usuario } from 'src/app/interfaces/interface';
import { CompeticionService } from 'src/app/services/competicion.service';
import { ComunicacionAlertaService } from 'src/app/services/comunicacion-alerta.service';
import { ModalidadService } from 'src/app/services/modalidad.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listado-torneo',
  templateUrl: './listado-torneo.component.html',
  styleUrls: ['./listado-torneo.component.scss']
})
export class ListadoTorneoComponent implements OnInit, AfterViewInit {

  columnas: string[] = ['Nombre', 'Instalacion', "ButtonEdit", "ButtonDelete"];
  listadoCompeticiones : ListadoCompeticiones = {
    competiciones: []
  }
  modalidades: modalidad [];
  usuarioAutenticado : Usuario;

  tipoInstalacion: number ;

  dataSourceTabla = new MatTableDataSource<competicion>(this.listadoCompeticiones.competiciones);
  constructor( private competicionService: CompeticionService , private router: Router,
    private usuarioService : UsuarioService, private rutaActiva : ActivatedRoute ,
    private comunicacionAlertas: ComunicacionAlertaService,
    private modalidadService: ModalidadService ) { }
  ngAfterViewInit(): void {
    this.actualizaListadoCompeticiones();
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
    //console.log(this.tipoInstalacion);
    
  }

  
  actualizaListadoCompeticiones() {
    
    // this.comunicacionAlertas.abrirDialogCargando(); // Pantalla de carga
     // Petición de instalaciones al servicio
     
     this.competicionService.getListadoCompeticiones(this.tipoInstalacion).subscribe(data => {
       if (data["result"] == "fail") { // Algo ha fallado
         this.comunicacionAlertas.abrirDialogError('Imposible obtener los mensajes desde el servidor');
       }
       else { // Todo ha ido bien, se refresca el dataSourceTabla, con un nuevo MatTableDataSource.
         this.listadoCompeticiones = data;
         this.dataSourceTabla = new MatTableDataSource<competicion>(this.listadoCompeticiones.competiciones);
         this.comunicacionAlertas.cerrarDialogo();
       }
     });
   }

   cambioCompeticiones(indice) {
    if (indice == 2){
      this.actualizaListadoCompeticiones;
    }
    if (indice == 1){
      this.router.navigate(["/listadoInstalaciones/"+this.tipoInstalacion]);
    }
    if (indice == 0){
      this.router.navigate(["/pantallaPrincipal"]);
    }
  }  

  getInstalacionTorneo (instalacion: instalacion){
    return instalacion.nombre;
  }

  eliminar (id: number){
    console.log(id);
    this.competicionService.eliminarCompeticion(id).subscribe(resultado => {
        this.comunicacionAlertas.mostrarSnackBar('Eliminado')
        this.actualizaListadoCompeticiones();
      
     });
    
  }

  nuevoTorneo() {
    this.router.navigate(['/nuevoTorneo/'+this.tipoInstalacion]); 
  }   

  /*
  cargarModalidades (){
    this.modalidades = [];
    this.modalidadService.getListadoModalidad().subscribe(
      modalidades => modalidades.forEach(modalidad => this.modalidades.push(modalidad)));
  }
  */

}
