import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListadoCompeticiones } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class CompeticionService {

  constructor( private http: HttpClient) { }

  getListadoCompeticiones (tipo: number):Observable<ListadoCompeticiones>{
    return this.http.get<ListadoCompeticiones>("/torneo/deporte/?mod="+tipo).pipe();

  }

  eliminarCompeticion (id: number):Observable<any>{
    console.log("id torneo " + id);
    return this.http.delete<any>('/torneo/delete/'+id);
  }

  crearNuevaInstalacion (nombre: string, idModalidad:number,  idInstalacion: number){
    console.log ( " idModalidad " + idInstalacion+ " modalidad " + idModalidad );
    var dto = {
      'nombre':nombre,
      'idModalidad': idModalidad,
      'idInstalacion': idInstalacion,
    };
    return this.http.put<string>('/torneo/nuevo',dto);
  }

}
