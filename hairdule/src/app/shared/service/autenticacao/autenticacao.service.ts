import { Injectable } from '@angular/core';
import { HairduleService } from '../hairduleLogin.service';
import { Usuario } from '../../models/usuario';

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
