import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class HairduleService {

  apiUrl = 'http://localhost:8080/hairdule/login';

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'aplication/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  enviarCamposLogin(usuario: Usuario) {
    return this.httpClient.post<Usuario>(this.apiUrl, usuario);
  }
}
