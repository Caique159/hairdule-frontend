import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements CanActivate {
  constructor(private authService: AutenticacaoService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.verificarSeEstaLogado()) {
      return true; // Permitir acesso à rota
    } else {
      this.router.navigate(['']); // Redirecionar para a página de login
      return false; // Negar acesso à rota
    }
  }
}
