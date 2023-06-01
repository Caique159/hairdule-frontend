import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(){}

  private isAuthenticated = false;

  login() {
    // Lógica de autenticação
    this.isAuthenticated = true;
  }

  logout() {
    // Lógica de logout
    this.isAuthenticated = false;
  }

  verificarSeEstaLogado(): boolean {
    return this.isAuthenticated;

  }
}
