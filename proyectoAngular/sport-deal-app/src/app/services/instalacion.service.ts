import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { instalacion, ListadoInstalaciones, modalidad } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class InstalacionService {

  constructor( private http: HttpClient) { }

  getListadoInstalaciones (tipo: number):Observable<ListadoInstalaciones>{
    return this.http.get<ListadoInstalaciones>('/instalacion/deporte/?mod=' + tipo).pipe();
  }

  getNombreInstalaciones (tipo: number):Observable<instalacion[]>{
    return this.http.get<instalacion[]>('/instalacion/nombres/?mod='+tipo).pipe();
  }

  getNombreInstalacion (tipo: number):Observable<any>{
    return this.http.get<any>('instalacion/id/?mod='+tipo).pipe();
  }

 /* crearNuevaInstalacion (nombre: string, imagen: string, localidad:string, capacidad: number, fecha_construccion: Date, idModalidad: number){
    console.log (nombre + " " + localidad + " " + capacidad + " " + fecha_construccion + " " + idModalidad);
    var dto = {
      'nombre':nombre,
      'imagen': imagen,
      'localidad': localidad,
      'capacidad': capacidad,
      'fecha_construccion' : fecha_construccion,
      'idModalidad' : idModalidad
    };
    return this.http.put<string>('/instalacion/nueva',dto);
  }*/

  crearNuevaInstalacion (nombre: string,  localidad:string, capacidad: number, f_construccion: Date, idModalidad: number, imagen: string){
    console.log ( " idModalidad " + idModalidad );
    var dto = {
      'nombre':nombre,
      'localidad': localidad,
      'capacidad': capacidad,
      'f_construccion' : f_construccion,
      'idModalidad' : idModalidad,
      'imagen': imagen,
    };
    return this.http.put<string>('/instalacion/nueva',dto);
  }

  

}
