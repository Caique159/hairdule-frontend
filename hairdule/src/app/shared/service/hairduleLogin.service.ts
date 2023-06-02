import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class HairduleLoginService {

  apiUrl = 'http://localhost:8080/hairdule/usuario/login';

  private validarEmail = false;

  validar() {
    // Lógica de autenticação
    this.validarEmail = true;
  }

  naoValidar() {
    // Lógica de logout
    this.validarEmail = false;
  }

  verificarSeEstaValidado(): boolean {
    return this.validarEmail;

  }


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
