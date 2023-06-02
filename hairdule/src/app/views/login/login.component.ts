import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/shared/models/usuario';
import { HairduleLoginService } from 'src/app/shared/service/hairduleLogin.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/shared/service/autenticacao/autenticacao.service';

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
  botaoDesabilitado: boolean = false;

  toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  ngOnInit() {
    localStorage.clear();
  }

  usuario: Usuario[] = [];

  loginForm = this.fb.group({
    id_Do_Usuario: [],
    login_Usuario: [null, [Validators.required, Validators.email]],
    senha_Usuario: [null, Validators.required],
    tipo_Usuario: [],
    tipo_Acesso_Funcionario_Usuario: [],
    chave_Seguranca_Usuario: []
  })

  constructor(
    private fb: FormBuilder,
    private HairduleLoginService: HairduleLoginService,
    private router: Router,
    private autenticar: AutenticacaoService
  ){
  }

  montarUsuario(): Usuario {
    return{
      id_Do_Usuario: this.loginForm.get('id_Do_Usuario')?.value ?? '',
      login_Usuario: this.loginForm.get('login_Usuario')?.value ?? '',
      senha_Usuario:  this.loginForm.get('senha_Usuario')?.value ?? '',
      tipo_Usuario: this.loginForm.get('tipo_Usuario')?.value ?? '',
      tipo_Acesso_Funcionario_Usuario: this.loginForm.get('tipo_Acesso_Funcionario_Usuario')?.value ?? '',
      chave_Seguranca_Usuario: this.loginForm.get('chave_Seguranca_Usuario')?.value ?? '',
    }
  }

  verificarEmailValido(){
    if(this.loginForm.get('login_Usuario')?.invalid){
      this.botaoDesabilitado = true
      this.mensagem = "Esse e-mail é inválido. Ele deveria ter um formato assim: exemplo@exemplo.com"
    }else{
      this.mensagem = '';
      this.botaoDesabilitado = false
    }
  }

  limparMensagem(){
    this.mensagem = '';
  }

  verificarUsuarioValido(){
    if(this.HairduleLoginService.verificarSeEstaValidado() === false || this.mensagem === ''){
      this.verificarEmailValido();
      this.HairduleLoginService.validar()
    }
  }


  onCaractereInformado(valor: string): void {
    if(this.HairduleLoginService.verificarSeEstaValidado() === true){
      this.verificarEmailValido();
    }
  }

  enviarCamposLogin() {
    this.mensagem = '';
    if(this.loginForm.get('login_Usuario')?.invalid){
      this.mensagem = "Esse e-mail é inválido. Ele deveria ter um formato assim: exemplo@exemplo.com"
    }else{
      if (this.loginForm.valid){
        const usuario = this.montarUsuario();
        console.log('usuario', usuario);

      // verificar como nao passar a senha no post
        this.HairduleLoginService.enviarCamposLogin(usuario).subscribe(
          {
            next: (res: any) => {
              if(res.length === 0){
               //res[0].idIdentificacaoUsuario
                this.mensagem = "Usuario ou senha invalidos"
              }else{
                this.autenticar.login()
                console.log(this.autenticar.verificarSeEstaLogado)
                this.mensagem = "Login com sucesso"
                this.router.navigate(['/homeEmpresa']);
              }
            },
            error: (error) => {
              this.mensagem = "Falha ao efetuar login"
              console.log(error)
            }
          }
        )
      }else {
        const usuario = this.montarUsuario();
        if(!usuario.login_Usuario && !usuario.senha_Usuario){
          this.mensagem = 'Campo usuario e senha não preenchidos';
        }else{
          if (!usuario.login_Usuario){
            this.mensagem = 'Campo usuario não preenchido';
        }else{
          this.mensagem = 'Campo senha não preenchido';
        }
        }
      }
    }
  }
}


