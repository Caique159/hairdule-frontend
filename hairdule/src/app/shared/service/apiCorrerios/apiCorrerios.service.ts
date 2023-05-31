import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  private apiUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) { }

  buscarEndereco(cep: string) {
    return this.http.get(`${this.apiUrl}/${cep}/json/`);
  }
}
