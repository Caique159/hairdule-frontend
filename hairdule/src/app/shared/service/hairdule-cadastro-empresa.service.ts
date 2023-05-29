import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class HairduleCadastroEmpresaService {
  apiUrl = 'http://localhost:8080/hairdule/cadastrar/empresa';

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'aplication/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  enviarCamposCadastroEmpresa(empresa: Empresa) {
    return this.httpClient.post<String>(this.apiUrl, empresa);
  }
}
