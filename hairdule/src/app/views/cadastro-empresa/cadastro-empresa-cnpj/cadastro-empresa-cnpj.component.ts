import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/shared/models/empresa';
import { HairduleCadastroEmpresaService } from 'src/app/shared/service/hairdule-cadastro-empresa.service';

@Component({
  selector: 'app-cadastro-empresa-cnpj',
  templateUrl: './cadastro-empresa-cnpj.component.html',
  styleUrls: ['./cadastro-empresa-cnpj.component.css']
})
export class CadastroEmpresaCnpjComponent {

  ngOnInit() {
    // Recupera os dados da empresa do localStorage
    const storedEmpresa = localStorage.getItem('empresaCNPJ');

    if (storedEmpresa && typeof storedEmpresa === 'string') {
      const empresa: Empresa = JSON.parse(storedEmpresa.toString());

      this.empresaForm.patchValue({
        cnpj_cadastro_empresa: empresa.cnpj_cadastro_empresa,
        nome_fantasia_cadastro_empresa: empresa.nome_fantasia_cadastro_empresa,
        razao_social_cadastro_empresa: empresa.razao_social_cadastro_empresa,
        telefone_cadastro_empresa: empresa.telefone_cadastro_empresa
      });
    }
  }

  constructor(
    private fb: FormBuilder,
    private HairduleCadastroEmpresaService: HairduleCadastroEmpresaService,
    private router: Router,
  ){
  }

  mensagem: string = '';

  empresaForm = this.fb.group({
    cnpj_cadastro_empresa: ['', Validators.required],
    razao_social_cadastro_empresa: ['', Validators.required],
    nome_fantasia_cadastro_empresa: ['', Validators.required],
    telefone_cadastro_empresa: ['', Validators.required]
  })


  montarEmpresa(): void{

    const minhaEmpresa: Empresa = {

      cnpj_cadastro_empresa: this.empresaForm.get('cnpj_cadastro_empresa')?.value ?? '',
      nome_fantasia_cadastro_empresa: this.empresaForm.get('nome_fantasia_cadastro_empresa')?.value ?? '',
      razao_social_cadastro_empresa: this.empresaForm.get('razao_social_cadastro_empresa')?.value ?? '',
      telefone_cadastro_empresa: this.empresaForm.get('telefone_cadastro_empresa')?.value ?? '',
      cep_cadastro_empresa: '',
      rua_cadastro_empresa: '',
      bairro_cadastro_empresa: '',
      estado_cadastro_empresa: '',
      numero_endereco_cadastro_empresa: '',
      email_cadastro_empresa: '',
      senha_cadastro_empresa: '',
      confirmacao_senha_cadastro_empresa: '',
    }
    localStorage.setItem('empresaCNPJ', JSON.stringify(minhaEmpresa));
    this.HairduleCadastroEmpresaService.setCnpjEmpresa(minhaEmpresa)
  }

  ValidarCampoObrigatorio() {
    this.montarEmpresa();
    console.log(this.empresaForm)
    if (this.empresaForm.valid){
      this.router.navigate(['/cadastroEnderecoEmpresa']);
    }else{
      this.mensagem = "Cadastro invalido"
    }
  }

  VoltarTelaAnterior(){
    this.router.navigate(['/cadastroEmailEmpresa']);
  }
}
