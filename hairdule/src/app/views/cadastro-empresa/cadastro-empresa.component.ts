import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Empresa } from 'src/app/shared/models/empresa';
import { HairduleCadastroEmpresaService } from 'src/app/shared/service/hairdule-cadastro-empresa.service';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresa {

  constructor(
    private fb: FormBuilder,
    private HairduleCadastroEmpresaService: HairduleCadastroEmpresaService
  ){
  }
  mensagem: string = '';

  empresa: Empresa[] = [];

  empresaForm = this.fb.group({
    cnpj_cadastro_empresa: [null, Validators.required],
    nome_fantasia_cadastro_empresa: [null, Validators.required],
    razao_social_cadastro_empresa: [null, Validators.required],
    email_cadastro_empresa: [null, Validators.required],
    telefone_cadastro_empresa: [null, Validators.required],
    cep_cadastro_empresa: [null, Validators.required],
    rua_cadastro_empresa: [null, Validators.required],
    bairro_cadastro_empresa: [null, Validators.required],
    estado_cadastro_empresa: [null, Validators.required],
    numero_endereco_cadastro_empresa: [null, Validators.required],
    senha_cadastro_empresa: [null, Validators.required],
    confirmacao_senha_cadastro_empresa: [null, Validators.required]
  })

  montarEmpresa(): Empresa {
    return{
      cnpj_cadastro_empresa: this.empresaForm.get('cnpj_empresa')?.value ?? '',
      nome_fantasia_cadastro_empresa: this.empresaForm.get('nome_fantasia_empresa')?.value ?? '',
      razao_social_cadastro_empresa: this.empresaForm.get('razao_social_empresa')?.value ?? '',
      email_cadastro_empresa: this.empresaForm.get('email_cadastro_empresa')?.value ?? '',
      telefone_cadastro_empresa: this.empresaForm.get('telefone_empresa')?.value ?? '',
      cep_cadastro_empresa: this.empresaForm.get('cep_empresa')?.value ?? '',
      rua_cadastro_empresa: this.empresaForm.get('rua_empresa')?.value ?? '',
      bairro_cadastro_empresa: this.empresaForm.get('bairro_empresa')?.value ?? '',
      estado_cadastro_empresa: this.empresaForm.get('estado_empresa')?.value ?? '',
      numero_endereco_cadastro_empresa: this.empresaForm.get('numero_endereco_empresa')?.value ?? '',
      senha_cadastro_empresa: this.empresaForm.get('senha_empresa')?.value ?? '',
      confirmacao_senha_cadastro_empresa: this.empresaForm.get('confirmacao_senha_empresa')?.value??''
    }
  }

  enviarCamposCadastroEmpresa() {
    this.mensagem = '';
    if (this.empresaForm.valid){
      const empresa = this.montarEmpresa();
      console.log('Empresa', empresa);

      // verificar como nao passar a senha no post
      this.HairduleCadastroEmpresaService.enviarCamposCadastroEmpresa(empresa).subscribe(
        {
          next: (res: String) => {
            if(res === "Usuario cadastrado com sucesso"){
              //res[0].idIdentificacaoUsuario
              alert("Cadastro Realizado com Sucesso")
            }else{
              alert("Dados invalidos")
            }
          },
          error: (error) => {
            alert("Falha ao efetuar cadastro ")
            console.log(error)
          }
        }
      )
    }else {
      this.empresaForm.controls.email_cadastro_empresa.markAllAsTouched();
      alert("Dados Informados Invalidos")
    }
  }

}
