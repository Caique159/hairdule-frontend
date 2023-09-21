import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class HairduleConsultaDadosEmpresasService {

  apiconsultarEmpresa = 'http://localhost:8080/hairdule/empresa/consultarEmpresa';


  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'aplication/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  consultarEmpresa(empresa: Empresa) {
    return this.httpClient.post(this.apiconsultarEmpresa, empresa);
  }
}
