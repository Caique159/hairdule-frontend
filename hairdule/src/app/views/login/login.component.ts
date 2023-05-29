import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/models/usuario';
import { HairduleService } from 'src/app/shared/service/hairdule.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  mensagem: string = '';
  mostrarSenha: boolean = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  usuario: Usuario[] = [];


  loginForm = this.fb.group({
    idDoUsuario: [],
    loginUsuario: [null, Validators.required],
    senhaUsuario: [null, Validators.required],
    tipoUsuario: [],
    tipoAcessoFuncionarioUsuario: [],
    chaveSegurancaUsuario: []
  })

  constructor(
    private fb: FormBuilder,
    private HairduleService: HairduleService
  ){
  }

  montarUsuario(): Usuario {
    return{
      idDoUsuario: this.loginForm.get('idDoUsuario')?.value ?? '',
      loginUsuario: this.loginForm.get('loginUsuario')?.value ?? '',
      senhaUsuario:  this.loginForm.get('senhaUsuario')?.value ?? '',
      tipoUsuario: this.loginForm.get('tipoUsuario')?.value ?? '',
      tipoAcessoFuncionarioUsuario: this.loginForm.get('tipoAcessoFuncionarioUsuario')?.value ?? '',
      chaveSegurancaUsuario: this.loginForm.get('chaveSegurancaUsuario')?.value ?? '',
    }
  }

  enviarCamposLogin() {
    this.mensagem = '';
    if (this.loginForm.valid){
      const usuario = this.montarUsuario();
      console.log('usuario', usuario);

      // verificar como nao passar a senha no post
      this.HairduleService.enviarCamposLogin(usuario).subscribe(
        {
          next: (res: any) => {
            if(res.length === 0){
              //res[0].idIdentificacaoUsuario
              alert("Usuario ou senha invalidos")
            }else{
              alert("Login com sucesso")
            }
          },
          error: (error) => {
            alert("Falha ao efetuar login")
            console.log(error)
          }
        }
      )
    }else {
      const usuario = this.montarUsuario();
      if(!usuario.loginUsuario && !usuario.senhaUsuario){
        this.mensagem = 'Campo usuario e senha não preenchidos';
      }else{
        if (!usuario.loginUsuario){
          this.mensagem = 'Campo usuario não preenchido';
      }else{
        this.mensagem = 'Campo senha não preenchido';
      }
      }
    }
  }

}


