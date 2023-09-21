import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/shared/models/empresa';
import { ConsultaReceitaService } from 'src/app/shared/service/consultaReceitaFederal/ConsultaReceita.Service';
import { HairduleCadastroEmpresaService } from 'src/app/shared/service/hairdule-cadastro-empresa.service';

@Component({
  selector: 'app-cadastro-empresa-cnpj',
  templateUrl: './cadastro-empresa-cnpj.component.html',
  styleUrls: ['./cadastro-empresa-cnpj.component.css']
})
export class CadastroEmpresaCnpjComponent {
  dadosEmpresa: any;
  exibirMensagemPiscante: boolean = false;
  duracaoAnimacao: number = 1000;
  botaoDesabilitado: boolean = false
  mensagemCnpj: string = '';
  mensagemTelefone: string = '';
  mensagemGeral: string = '';
  dddsValidos = [
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24',
    '27', '28', '31', '32', '33', '34', '35', '37', '38', '41', '42', '43',
    '44', '45', '46', '47', '48', '49', '51', '53', '54', '55', '61', '62',
    '63', '64', '65', '66', '67', '68', '69', '71', '73', '74', '75', '77',
    '79', '81', '82', '83', '84', '85', '86', '87', '88', '89', '91', '92',
    '93', '94', '95', '96', '97', '98', '99'
  ];

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
      this.verificarCampoCNPJZerado();
      this.verificarCampoTelefoneZerado();
    }
  }

  constructor(
    private fb: FormBuilder,
    private HairduleCadastroEmpresaService: HairduleCadastroEmpresaService,
    private router: Router,
    private consultaReceita: ConsultaReceitaService
  ){
  }

  empresaForm = this.fb.group({
    cnpj_cadastro_empresa: ['', Validators.required],
    razao_social_cadastro_empresa: ['', Validators.required],
    nome_fantasia_cadastro_empresa: ['', Validators.required],
    telefone_cadastro_empresa: ['', Validators.required]
  })

  onCNPJCaractereInformado(valor: string): void {
      this.verificarCampoCNPJZerado();
  }

  onTelefoneCaractereInformado(valor: string): void {
    this.verificarCampoTelefoneZerado();
}

  verificarCampoCNPJZerado() {
    const cnpjEmpresa = this.empresaForm.get('cnpj_cadastro_empresa')?.value ?? '';
    if (cnpjEmpresa === "00000000000000") {
      this.mensagemCnpj = 'CNPJ não pode ser zerado';
      this.botaoDesabilitado = true
    }else{
      //this.consultarCnpj(cnpjEmpresa)
      this.botaoDesabilitado = false
      this.mensagemCnpj = '';
    }
  }

  verificarCampoTelefoneZerado() {
    const telefoneEmpresa = this.empresaForm.get('telefone_cadastro_empresa')?.value ?? '';
    if (telefoneEmpresa === "00000000000") {
      this.mensagemTelefone = 'Telefone não pode ser zerado';
      this.botaoDesabilitado = true
    }else{
      const ddd = telefoneEmpresa.substr(0, 2);
      console.log('DDD', ddd)
      if(this.dddsValidos.includes(ddd)){
        const telefone = telefoneEmpresa.substr(2, 9);
        console.log('telefone', telefone)
        if(telefone === '000000000'){
          this.mensagemTelefone = 'Telefone não pode ser zerado';
          this.botaoDesabilitado = true
        }else{
          this.botaoDesabilitado = false
          this.mensagemTelefone = '';
        }
      }else{
        this.mensagemTelefone = 'DDD do telefone invalido';
        this.botaoDesabilitado = true
      }
    }
  }

  consultarCnpj(cnpj: string) {
    this.consultaReceita.consultarCnpj(cnpj).subscribe(
      response => {
        this.dadosEmpresa = response;
        console.log(this.dadosEmpresa);
      },
      error => {
        console.log(error);
        this.mensagemCnpj = 'CNPJ Não existe na base da receita';
      }
    );
  }

  montarEmpresa(): void{

    const minhaEmpresa: Empresa = {
      idIdentificacaoUsuario: '',
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

  alternarMensagemPiscante(): void {
    this.exibirMensagemPiscante = !this.exibirMensagemPiscante;

    if (this.exibirMensagemPiscante) {
      setTimeout(() => {
        this.exibirMensagemPiscante = false;
      }, this.duracaoAnimacao);
    }
  }

  ValidarCampoObrigatorio() {
    this.montarEmpresa();
    console.log(this.empresaForm)
    if (this.empresaForm.valid){
      if(this.mensagemGeral === ''){
        this.router.navigate(['/cadastroEnderecoEmpresa']);
      }else{
        this.alternarMensagemPiscante();
      }
    }else{
      this.mensagemGeral = "Dados Invalidos"
    }
  }

  VoltarTelaAnterior(){
    this.router.navigate(['/cadastroEmailEmpresa']);
  }
}
