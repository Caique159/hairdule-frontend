import { Component, Inject } from '@angular/core';
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


  ngOnInit() {
    // Recupera os dados da empresa do localStorage
    const storedEmpresa = localStorage.getItem('empresaEndereco');

    if (storedEmpresa && typeof storedEmpresa === 'string') {
      const empresa: Empresa = JSON.parse(storedEmpresa.toString());

      this.empresaForm.patchValue({
        cep_cadastro_empresa: empresa.cep_cadastro_empresa,
        rua_cadastro_empresa: empresa.rua_cadastro_empresa,
        bairro_cadastro_empresa: empresa.bairro_cadastro_empresa,
        estado_cadastro_empresa: empresa.estado_cadastro_empresa,
        numero_endereco_cadastro_empresa: empresa.numero_endereco_cadastro_empresa
      });
    }

    this.empresaForm.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.montarEmpresa();
      }
    });
  }

  constructor(
    private fb: FormBuilder,
    private HairduleCadastroEmpresaService: HairduleCadastroEmpresaService,
    private router: Router,
  ){
  }


  mensagem: string = '';


  empresaForm = this.fb.group({
    cep_cadastro_empresa: ['', Validators.required],
    rua_cadastro_empresa: ['', Validators.required],
    bairro_cadastro_empresa: ['', Validators.required],
    estado_cadastro_empresa: ['', Validators.required],
    numero_endereco_cadastro_empresa: ['', Validators.required],
  })


  montarEmpresa(): void{

    const minhaEmpresa: Empresa = {

      cnpj_cadastro_empresa: '',
      nome_fantasia_cadastro_empresa: '',
      razao_social_cadastro_empresa: '',
      telefone_cadastro_empresa: '',
      cep_cadastro_empresa: this.empresaForm.get('cep_cadastro_empresa')?.value ?? '',
      rua_cadastro_empresa: this.empresaForm.get('rua_cadastro_empresa')?.value ?? '',
      bairro_cadastro_empresa: this.empresaForm.get('bairro_cadastro_empresa')?.value ?? '',
      estado_cadastro_empresa: this.empresaForm.get('estado_cadastro_empresa')?.value ?? '',
      numero_endereco_cadastro_empresa: this.empresaForm.get('numero_endereco_cadastro_empresa')?.value ?? '',
      email_cadastro_empresa: '',
      senha_cadastro_empresa: '',
      confirmacao_senha_cadastro_empresa: '',
    }
    localStorage.setItem('empresaEndereco', JSON.stringify(minhaEmpresa));
    this.HairduleCadastroEmpresaService.setEnderecoEmpresa(minhaEmpresa)
  }



  enviarCamposCadastroEmpresa() {
    this.montarEmpresa();
    this.mensagem = '';
    if (this.empresaForm.valid){
      const empresa = this.HairduleCadastroEmpresaService.getEmpresa();
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