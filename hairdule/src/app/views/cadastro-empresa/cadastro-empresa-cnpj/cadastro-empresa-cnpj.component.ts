import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HairduleCadastroEmpresaService } from 'src/app/shared/service/hairdule-cadastro-empresa.service';

@Component({
  selector: 'app-cadastro-empresa-cnpj',
  templateUrl: './cadastro-empresa-cnpj.component.html',
  styleUrls: ['./cadastro-empresa-cnpj.component.css']
})
export class CadastroEmpresaCnpjComponent {

  constructor(
    private fb: FormBuilder,
    private HairduleCadastroEmpresaService: HairduleCadastroEmpresaService,
    private router: Router,
  ){
  }

  mensagem: string = '';

  empresaForm = this.fb.group({
    cnpj_cadastro_empresa: [null, Validators.required],
    razao_social_cadastro_empresa: [null, Validators.required],
    nome_fantasia_cadastro_empresa: [null, Validators.required],
    telefone_cadastro_empresa: [null, Validators.required]
  })

  ValidarCampoObrigatorio() {

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
