import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { RecuperarSenhaComponent } from './views/recuperar-senha/recuperar-senha.component';
import { HomeBarbeiroComponent } from './views/home-Empresa/home-Empresa.component';
import { AuthGuard } from './shared/service/autenticacao/AuthGuard.service';
import { CadastroEmpresaEmailComponent } from './views/cadastro-empresa/cadastro-empresa-email/cadastro-empresa-email.component';
import { CadastroEmpresaCnpjComponent } from './views/cadastro-empresa/cadastro-empresa-cnpj/cadastro-empresa-cnpj.component';
import { CadastroEmpresaEnderecoComponent } from './views/cadastro-empresa/cadastro-empresa-endereco/cadastro-empresa-endereco.component';

RecuperarSenhaComponent

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'cadastroEmailEmpresa',
    component: CadastroEmpresaEmailComponent
  },
  {
    path: 'cadastroCNPJEmpresa',
    component: CadastroEmpresaCnpjComponent
  },
  {
    path: 'cadastroEnderecoEmpresa',
    component: CadastroEmpresaEnderecoComponent
  },
  {
    path: 'recuperarSenha',
    component: RecuperarSenhaComponent
  },
  {
    path: 'homeEmpresa',
    component: HomeBarbeiroComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
