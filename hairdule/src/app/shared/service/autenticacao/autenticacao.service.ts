import { Injectable } from '@angular/core';
import { HairduleService } from '../hairduleLogin.service';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private usuario: Usuario){}

  isAuthenticated(): boolean {
    if (this.usuario.id_Do_Usuario){
      return true
    }else {
      return false
    }
  }
}
