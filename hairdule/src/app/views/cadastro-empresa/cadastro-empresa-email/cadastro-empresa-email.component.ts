import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HairduleCadastroEmpresaService } from 'src/app/shared/service/hairdule-cadastro-empresa.service';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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
    email_cadastro_empresa: [null, Validators.required],
    senha_cadastro_empresa: [null, Validators.required],
    confirmacao_senha_cadastro_empresa: [null, Validators.required]
  })

  ValidarCampoObrigatorio() {
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
      this.mensagem = "Cadastro invalido"
    }
  }
}
