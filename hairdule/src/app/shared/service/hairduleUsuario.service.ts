import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class HairduleUsuarioService {

  apiUrlVerificarUsuarioExiste = 'http://localhost:8080/hairdule/usuario/verificarUsuarioExistente';

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'aplication/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  verificaSeUsuarioJaCadastrado(login_usuario: Usuario) {
    return this.httpClient.post(this.apiUrlVerificarUsuarioExiste, login_usuario, { responseType: 'text' });
  }

}
