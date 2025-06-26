import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lugar } from '../model/lugar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  constructor(private readonly http: HttpClient) { }

  salvar(lugar: Lugar): Observable<Lugar> {
    return this.http.post<Lugar>('http://localhost:3000/lugares', lugar);
  }

  listarTodas(): Observable<Lugar[]> {
    return this.http.get<Lugar[]>('http://localhost:3000/lugares');
  }

}
