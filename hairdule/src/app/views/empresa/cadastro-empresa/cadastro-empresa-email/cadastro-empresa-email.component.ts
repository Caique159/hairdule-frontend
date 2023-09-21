import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, convertToParamMap } from '@angular/router';
import { HairduleCadastroEmpresaService } from 'src/app/shared/service/hairdule-cadastro-empresa.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Empresa } from 'src/app/shared/models/empresa';
import { Usuario } from 'src/app/shared/models/usuario';
import { HairduleLoginService } from 'src/app/shared/service/hairduleLogin.service';
import { HairduleUsuarioService } from 'src/app/shared/service/hairduleUsuario.service';

@Component({
  selector: 'app-cadastro-empresa-email',
  templateUrl: './cadastro-empresa-email.component.html',
  styleUrls: ['./cadastro-empresa-email.component.css']
})

export class CadastroEmpresaEmailComponent {

  // Variareis locais
  exibirMensagemPiscante: boolean = false;
  mensagemGeral: string = '';
  mensagemEmail: string = '';
  mensagemSenha: string = '';
  mostrarSenha: boolean = false;
  mostrarConfirmacaoSenha: boolean = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  duracaoAnimacao: number = 1000;
  botaoDesabilitado: boolean = false;

  constructor(
    private fb: FormBuilder,
    private HairduleCadastroEmpresaService: HairduleCadastroEmpresaService,
    private HairduleUsuarioService: HairduleUsuarioService,
    private router: Router
  ){
  }

  // Executa essa funcao ao iniciar a tela
  ngOnInit() {
    // Recupera os dados da empresa do localStorage
    const storedEmpresa = localStorage.getItem('empresaEmail');

    if (storedEmpresa && typeof storedEmpresa === 'string') {
      const empresa: Empresa = JSON.parse(storedEmpresa.toString());

      this.empresaForm.patchValue({
        email_cadastro_empresa: empresa.email_cadastro_empresa,
        senha_cadastro_empresa: empresa.senha_cadastro_empresa || null,
        confirmacao_senha_cadastro_empresa: empresa.confirmacao_senha_cadastro_empresa || null
      });
      this.verificarEmailValido();
      this.verificarSenhasIguais();
    }
  }

  toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  toggleMostrarConfirmacaoSenha() {
    this.mostrarConfirmacaoSenha = !this.mostrarConfirmacaoSenha;
  }

  empresaForm = this.fb.group({
    email_cadastro_empresa:  ['', [Validators.required, Validators.email]],
    senha_cadastro_empresa: ['', Validators.required],
    confirmacao_senha_cadastro_empresa: ['', Validators.required]
  })

  montarEmpresa(): void {
    const minhaEmpresa: Empresa = {
      idIdentificacaoUsuario:'',
      cnpj_cadastro_empresa: '',
      nome_fantasia_cadastro_empresa: '',
      razao_social_cadastro_empresa: '',
      telefone_cadastro_empresa: '',
      cep_cadastro_empresa: '',
      rua_cadastro_empresa: '',
      bairro_cadastro_empresa: '',
      estado_cadastro_empresa: '',
      numero_endereco_cadastro_empresa: '',
      email_cadastro_empresa: this.empresaForm.get('email_cadastro_empresa')?.value ?? '',
      senha_cadastro_empresa: this.empresaForm.get('senha_cadastro_empresa')?.value ?? '',
      confirmacao_senha_cadastro_empresa: this.empresaForm.get('confirmacao_senha_cadastro_empresa')?.value ?? '',
    }
    localStorage.setItem('empresaEmail', JSON.stringify(minhaEmpresa));
    this.HairduleCadastroEmpresaService.setEmailEmpresa(minhaEmpresa)
  }

  verificarUsuarioValido(){
    if(this.HairduleCadastroEmpresaService.verificarSeEstaValidado() === false || this.mensagemEmail === ''){
      this.verificarEmailValido();
      this.HairduleCadastroEmpresaService.validar()
    }
  }

  limparMensagemEmail(){
    this.mensagemEmail = '';
  }

  limparMensagemSenha(){
    this.mensagemSenha = '';
  }

  onCaractereInformado(valor: string): void {
    if(this.HairduleCadastroEmpresaService.verificarSeEstaValidado() === true){
      this.verificarEmailValido();
    }
  }

  alternarMensagemPiscante(): void {
    this.exibirMensagemPiscante = !this.exibirMensagemPiscante;

    if (this.exibirMensagemPiscante) {
      setTimeout(() => {
        this.exibirMensagemPiscante = false;
      }, this.duracaoAnimacao);
    }
  }

  ValidarCampoObrigatorio() {
    this.montarEmpresa()
    console.log(this.empresaForm)
    const senha = this.empresaForm.get('senha_cadastro_empresa')?.value ?? '';
    const confirmacaoSenha = this.empresaForm.get('confirmacao_senha_cadastro_empresa')?.value ?? '';

    if (this.empresaForm.valid){
      if(senha == confirmacaoSenha){

        this.verificarEmailValido()

        if (this.mensagemGeral === '' || this.mensagemEmail === '' || this.mensagemSenha === ''){
          this.router.navigate(['/cadastroCNPJEmpresa']);
        }else{
            this.alternarMensagemPiscante();
        }
      }else{
        this.mensagemSenha = "As senhas informadas não conferem"
      }
    }else{
      if(this.empresaForm.get('email_cadastro_empresa')?.invalid){
        this.mensagemEmail = "E-mail invalido"
      }else{
        this.mensagemGeral = "Dados Informados invalido"
      }
    }
  }

  montarUsuario(): Usuario {
    return{
      id_Do_Usuario: '',
      login_Usuario: this.empresaForm.get('email_cadastro_empresa')?.value ?? '',
      senha_Usuario: '',
      tipo_Usuario: '',
      tipo_Acesso_Funcionario_Usuario: '',
      chave_Seguranca_Usuario: '',
    }
  }

  verificarEmailValido(){
    if(this.empresaForm.get('email_cadastro_empresa')?.invalid){
      this.mensagemEmail = "Esse e-mail é inválido. Ele deveria ter um formato assim: exemplo@exemplo.com"
    }else{
      const usuario = this.montarUsuario();
      console.log('Usuario', usuario);
      this.HairduleUsuarioService.verificaSeUsuarioJaCadastrado(usuario).subscribe(
        {
          next: (res: String) => {
            const respostaValida = "Usuario " + usuario.login_Usuario +" econtrado"
            if(res === respostaValida){
              this.desabilitarCampos();
              this.empresaForm.setErrors({ 'invalido': true });
              this.mensagemEmail = "E-mail ja cadastrado"
              this.botaoDesabilitado = true
            }else{
              this.botaoDesabilitado = false
              this.mensagemEmail = "";
              this.habilitarCampos();
            }
          },
          error: (error) => {
            this.botaoDesabilitado = false;
            this.mensagemEmail = "Erro ao verificar se usuario existe";
            console.log(error)
          }
        }
      )
    }
  }

  desabilitarCampos() {
    const senhaCadastro = this.empresaForm.get('senha_cadastro_empresa');
    const confirmacaoSenhaCadastro = this.empresaForm.get('confirmacao_senha_cadastro_empresa');

    if (senhaCadastro) {
      senhaCadastro.disable();
    }

    if (confirmacaoSenhaCadastro) {
      confirmacaoSenhaCadastro.disable();
    }
  }

  habilitarCampos() {
    const senhaCadastro = this.empresaForm.get('senha_cadastro_empresa');
    const confirmacaoSenhaCadastro = this.empresaForm.get('confirmacao_senha_cadastro_empresa');

    if (senhaCadastro) {
      senhaCadastro.enable();
    }

    if (confirmacaoSenhaCadastro) {
      confirmacaoSenhaCadastro.enable();
    }
  }

  verificarSenhasIguais(){
    const senha = this.empresaForm.get('senha_cadastro_empresa')?.value ?? '';
    const confirmacaoSenha = this.empresaForm.get('confirmacao_senha_cadastro_empresa')?.value ?? '';

    if(confirmacaoSenha === null || confirmacaoSenha === '' || confirmacaoSenha === undefined ){
      this.mensagemSenha = '';
    }else{
      if(senha == confirmacaoSenha){
        this.mensagemSenha = '';
      }else{
        this.mensagemSenha = "As senhas informadas não conferem"
      }
    }
  }

  onCaractereInformadoSenha(valor: string): void {
    if(this.HairduleCadastroEmpresaService.verificarSeEstaValidadoSenhaIguais() === true){
      this.verificarSenhasIguais();
    }
  }

  verificarSenhasIguaisConfirmar(){
    if(this.HairduleCadastroEmpresaService.verificarSeEstaValidadoSenhaIguais() === false || this.mensagemSenha === ''){
      this.verificarSenhasIguais();
      this.HairduleCadastroEmpresaService.validarSenhasiguais()
    }
  }

  ValidarCancelar() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
