import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/shared/models/empresa';
import { HairduleCadastroEmpresaService } from 'src/app/shared/service/hairdule-cadastro-empresa.service';

@Component({
  selector: 'app-cadastroempresaendereco',
  templateUrl: './cadastro-empresa-endereco.component.html',
  styleUrls: ['./cadastro-empresa-endereco.component.css']
})
export class CadastroEmpresaEnderecoComponent {

  constructor(
    private fb: FormBuilder,
    private HairduleCadastroEmpresaService: HairduleCadastroEmpresaService,
    private router: Router,
  ){
  }


  mensagem: string = '';

  empresa: Empresa[] = [];

  empresaForm = this.fb.group({
    cep_cadastro_empresa: [null, Validators.required],
    rua_cadastro_empresa: [null, Validators.required],
    bairro_cadastro_empresa: [null, Validators.required],
    estado_cadastro_empresa: [null, Validators.required],
    numero_endereco_cadastro_empresa: [null, Validators.required],
  })

  montarEmpresa(): Empresa {
    return{
      cnpj_cadastro_empresa: this.empresaForm.get('cnpj_cadastro_empresa')?.value ?? '',
      nome_fantasia_cadastro_empresa: this.empresaForm.get('nome_fantasia_cadastro_empresa')?.value ?? '',
      razao_social_cadastro_empresa: this.empresaForm.get('razao_social_cadastro_empresa')?.value ?? '',
      email_cadastro_empresa: this.empresaForm.get('email_cadastro_empresa')?.value ?? '',
      telefone_cadastro_empresa: this.empresaForm.get('telefone_cadastro_empresa')?.value ?? '',
      cep_cadastro_empresa: this.empresaForm.get('cep_cadastro_empresa')?.value ?? '',
      rua_cadastro_empresa: this.empresaForm.get('rua_cadastro_empresa')?.value ?? '',
      bairro_cadastro_empresa: this.empresaForm.get('bairro_cadastro_empresa')?.value ?? '',
      estado_cadastro_empresa: this.empresaForm.get('estado_cadastro_empresa')?.value ?? '',
      numero_endereco_cadastro_empresa: this.empresaForm.get('numero_endereco_cadastro_empresa')?.value ?? '',
      senha_cadastro_empresa: this.empresaForm.get('senha_cadastro_empresa')?.value ?? '',
      confirmacao_senha_cadastro_empresa: this.empresaForm.get('confirmacao_senha_cadastro_empresa')?.value??''
    }
  }

  enviarCamposCadastroEmpresa() {
    console.log('log empresa', this.empresaForm);
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
      alert("Dados Informados Invalidos")
    }
  }

  VoltarTelaAnterior(){
    this.router.navigate(['/cadastroCNPJEmpresa']);
  }

}
