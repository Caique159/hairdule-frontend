import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, convertToParamMap } from '@angular/router';
import { HairduleCadastroEmpresaService } from 'src/app/shared/service/hairdule-cadastro-empresa.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Empresa } from 'src/app/shared/models/empresa';

@Component({
  selector: 'app-cadastro-empresa-email',
  templateUrl: './cadastro-empresa-email.component.html',
  styleUrls: ['./cadastro-empresa-email.component.css']
})

export class CadastroEmpresaEmailComponent {

  constructor(
    private fb: FormBuilder,
    private HairduleCadastroEmpresaService: HairduleCadastroEmpresaService,
    private router: Router,
  ){
  }

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
    }
  }

  mensagem: string = '';
  mostrarSenha: boolean = false;
  mostrarConfirmacaoSenha: boolean = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  toggleMostrarSenha() {
    this.mostrarSenha = !this.mostrarSenha;
  }

  toggleMostrarConfirmacaoSenha() {
    this.mostrarConfirmacaoSenha = !this.mostrarSenha;
  }

  empresaForm = this.fb.group({
    email_cadastro_empresa:  ['', [Validators.required, Validators.email]],
    senha_cadastro_empresa: ['', Validators.required],
    confirmacao_senha_cadastro_empresa: ['', Validators.required]
  })

  montarEmpresa(): void{

    const minhaEmpresa: Empresa = {

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

  ValidarCampoObrigatorio() {
    this.montarEmpresa()
    console.log(this.empresaForm)
    const senha = this.empresaForm.get('senha_cadastro_empresa')?.value ?? '';
    const confirmacaoSenha = this.empresaForm.get('confirmacao_senha_cadastro_empresa')?.value ?? '';

    if (this.empresaForm.valid){
      if(senha == confirmacaoSenha){
        this.router.navigate(['/cadastroCNPJEmpresa']);
      }else{
        this.mensagem = "Senhas não conferem"
      }
    }else{
      if(this.empresaForm.get('email_cadastro_empresa')?.invalid){
        this.mensagem = "Cadastro invalido 2"
      }else{
        this.mensagem = "Cadastro invalido"
      }
    }
  }

  verificarEmailValido(){
    if(this.empresaForm.get('email_cadastro_empresa')?.invalid){
      this.mensagem = "Esse e-mail é inválido. Ele deveria ter um formato assim: exemplo@exemplo.com"
    }else{
      this.mensagem = '';
    }
  }

  verificarSenhasIguais(){
    const senha = this.empresaForm.get('senha_cadastro_empresa')?.value ?? '';
    const confirmacaoSenha = this.empresaForm.get('confirmacao_senha_cadastro_empresa')?.value ?? '';

    if(confirmacaoSenha === null || confirmacaoSenha === '' || confirmacaoSenha === undefined ){
      this.mensagem = '';
    }else{
      if(senha == confirmacaoSenha){
        this.mensagem = '';
      }else{
        this.mensagem = "As senhas informadas não conferem"
      }
    }
}

  verificarSenhasIguaisConfirmar(){
      const senha = this.empresaForm.get('senha_cadastro_empresa')?.value ?? '';
      const confirmacaoSenha = this.empresaForm.get('confirmacao_senha_cadastro_empresa')?.value ?? '';

      if(senha == confirmacaoSenha){
        this.mensagem = '';
      }else{
        this.mensagem = "As senhas informadas não conferem"
      }
  }

  ValidarCancelar() {
    localStorage.clear();
    this.router.navigate(['']);
  }
}
