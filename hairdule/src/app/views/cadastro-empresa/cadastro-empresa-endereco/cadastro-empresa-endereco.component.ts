import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  empresaForm = this.fb.group({
    email_cadastro_empresa: [null, Validators.required]
  })

  ValidarCampoObrigatorio() {
    console.log(this.empresaForm)
    if (this.empresaForm.valid){
      this.router.navigate(['/cadastroCNPJEmpresa']);
    }else{
      this.mensagem = "Cadastro invalido"
    }
  }

}
