import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HairduleCadastroEmpresaService } from 'src/app/shared/service/hairdule-cadastro-empresa.service';
import { HairduleRecuperarSenhaService } from 'src/app/shared/service/hairduleRecuperarSenha.service';

@Component({
  selector: 'app-mensagem-padrao-cadastro-recuperar-senha',
  templateUrl: './mensagem-padrao-cadastro-recuperar-senha.component.html',
  styleUrls: ['./mensagem-padrao-cadastro-recuperar-senha.component.css']
})
export class MensagemPadraoCadastroRecuperarSenhaComponent {

  constructor(private hairduleCadastroEmpresaService: HairduleCadastroEmpresaService,
              private hairduleRecuperarSenhaService:HairduleRecuperarSenhaService,
              private router: Router){

  }

  ngOnInit() {
    if(this.hairduleRecuperarSenhaService.verificarSeMensagemSenhaRecuperada() ){
      this.mensagem = "Senha recuperada com sucesso, um e-mail foi enviado com a nova senha para " + this.hairduleRecuperarSenhaService.recuperarEmailEnviado()
      this.hairduleRecuperarSenhaService.limparEmailEnviado()
      this.hairduleRecuperarSenhaService.senhaNaoRecuperada()
    }else if(this.hairduleCadastroEmpresaService.verificarCadastradoComSucesso()){
      this.mensagem = "Cadastro realizado com sucesso"
      this.hairduleCadastroEmpresaService.naoFoiCadastradoComSucesso()
    }else{
      this.router.navigate(['']);
    }
  }

  mensagem = '';

  voltarParaTelaLogin(){
    this.router.navigate(['']);
  }
}
