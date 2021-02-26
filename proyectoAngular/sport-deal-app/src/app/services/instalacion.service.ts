import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListadoInstalaciones } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class InstalacionService {

  constructor( private http: HttpClient) { }

  getListadoInstalaciones (tipo: number, instOrComp: number):Observable<ListadoInstalaciones>{
    return this.http.get<ListadoInstalaciones>('/instalacion/deporte/?mod=' + tipo + '&torneo='+instOrComp).pipe();
  }

  

}
