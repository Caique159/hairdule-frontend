import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/shared/models/usuario';
import { HairduleRecuperarSenhaService } from 'src/app/shared/service/hairduleRecuperarSenha.service';
import { HairduleUsuarioService } from 'src/app/shared/service/hairduleUsuario.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent {

  mensagem: string = '';
  botaoDesabilitado: boolean = false;

  recuperarSenhaForm = this.fb.group({
    login_Usuario: ['',[Validators.required, Validators.email]]
  })

  constructor(
    private fb: FormBuilder,
    private hairduleRecuperarSenhaService: HairduleRecuperarSenhaService,
    private HairduleUsuarioService: HairduleUsuarioService,
    private router: Router
  ){
  }

  montarUsuario(): Usuario {
    return{
      id_Do_Usuario: '',
      login_Usuario: this.recuperarSenhaForm.get('login_Usuario')?.value ?? '',
      senha_Usuario:  '',
      tipo_Usuario: '',
      tipo_Acesso_Funcionario_Usuario:'',
      chave_Seguranca_Usuario: '',
    }
  }

  verificarUsuarioValido(){
    if(this.hairduleRecuperarSenhaService.verificarSeEstaValidado() === false){
      this.verificarEmailValido();
      this.hairduleRecuperarSenhaService.validar()
    }

  }

  limparMensagem(){
    this.mensagem = '';
  }

  onCaractereInformado(valor: string): void {
    console.log('verifica e-mail ?', this.hairduleRecuperarSenhaService.verificarSeEstaValidado() )
    if(this.hairduleRecuperarSenhaService.verificarSeEstaValidado() === true){
      this.verificarEmailValido();
    }
  }

  verificarEmailValido(){
    if(this.recuperarSenhaForm.get('login_Usuario')?.invalid){
      this.mensagem = "Esse e-mail é inválido. Ele deveria ter um formato assim: exemplo@exemplo.com"
    }else{
      const usuario = this.montarUsuario();
      console.log('Usuario', usuario);
      this.HairduleUsuarioService.verificaSeUsuarioJaCadastrado(usuario).subscribe(
        {
          next: (res: String) => {
            const respostaValida = "Usuario " + usuario.login_Usuario +" econtrado"
            console.log(respostaValida)
            if(res === respostaValida){
              this.mensagem="";
              this.botaoDesabilitado = false
            }else{
              this.botaoDesabilitado = true
              this.mensagem = "E-mail nao encontrado";
            }
          },
          error: (error) => {
            this.botaoDesabilitado = false;
            alert("Falha ao efetuar cadastro ")
            console.log(error)
          }
        }
      )
    }
  }

  enviarRecuperarSenha() {
    this.mensagem = '';
    if (this.recuperarSenhaForm.valid){
      const usuario = this.montarUsuario();
      console.log('usuario', usuario);
      this.hairduleRecuperarSenhaService.recuperarSenhaUsuario(usuario).subscribe(
        {
          next: (res: String) => {
            const respostaValida = "Senha do usuario " + usuario.login_Usuario +" foi recuperada com sucesso"
            if(res === respostaValida){
              this.hairduleRecuperarSenhaService.naoValidar()
              this.mensagem = "Senha Recuperada Com Sucesso"
            }else{
              this.mensagem = "Erro ao recuperar senha"
            }
          },
          error: (error: String) => {
            this.mensagem = "Falha ao efetuar login"
            console.log(error)
          }
        }
      )
    }else {
      const usuario = this.montarUsuario();
        if (!usuario.login_Usuario){
          this.mensagem = 'Campo usuario não preenchido';
      }
    }
  }

  voltarPagina(){
    this.router.navigate(['']);
  }


}
