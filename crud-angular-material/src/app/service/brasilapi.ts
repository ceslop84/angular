import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado, Municipio } from '../model/brasilapi';

@Injectable({
  providedIn: 'root'
})
export class BrasilApiService {

  private readonly baseUrl = 'https://brasilapi.com.br/api';

  constructor(private readonly http: HttpClient) { }

  listarUf(): Observable<Estado[]>{
    const path = '/ibge/uf/v1';
    return this.http.get<Estado[]>(this.baseUrl + path); 
  }

  listarMunicipios(siglaUf: string): Observable<Municipio[]>{
    const path = '/ibge/municipios/v1/' + siglaUf;
    return this.http.get<Municipio[]>(this.baseUrl + path); 
  }
}
