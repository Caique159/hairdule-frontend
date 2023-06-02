import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultaReceitaService {
  private apiUrl = 'https://www.receitaws.com.br/v1/cnpj';

  constructor(private http: HttpClient) { }

  consultarCnpj(cnpj: string) {
    const url = `${this.apiUrl}/${cnpj}`;
    return this.http.get(url);
  }
}
