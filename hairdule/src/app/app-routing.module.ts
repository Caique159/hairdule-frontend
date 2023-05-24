import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { CadastroEmpresa } from './views/cadastro-empresa/cadastro-empresa.component';
import { RecuperarSenhaComponent } from './views/recuperar-senha/recuperar-senha.component';
RecuperarSenhaComponent

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'cadastroEmpresa',
    component: CadastroEmpresa
  },
  {
    path: 'recuperarSenha',
    component: RecuperarSenhaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
