import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class HairduleRecuperarSenhaService {

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

  apiUrl = 'http://localhost:8080/hairdule/recuperarSenha';

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'aplication/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  recuperarSenhaUsuario(login_usuario: Usuario) {
    return this.httpClient.post(this.apiUrl, login_usuario, { responseType: 'text' });
  }

}
