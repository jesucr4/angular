import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { modalidad } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class ModalidadService {

  constructor( private http: HttpClient) { }


  getListadoModalidad():Observable<modalidad[]>{
    return this.http.get<modalidad[]>('modalidad/all');
  }

  filterByDescripcion(descripcion: string):Observable<modalidad>{
    return this.http.get<modalidad>('/modalidad/filterByDescripcion?descripcion='+descripcion).pipe(
      tap(result => console.log(result))
    );
  }

  filterById(id: number): Observable<modalidad>{
  return this.http.get<modalidad>('/modalidad/filterById?id='+id).pipe(
    tap(result=> console.log(result))
  );
  }
}
