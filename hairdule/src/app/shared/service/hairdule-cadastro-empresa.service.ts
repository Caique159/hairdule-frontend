import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Empresa } from '../models/empresa';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class HairduleCadastroEmpresaService {
  apiUrlCadastrar = 'http://localhost:8080/hairdule/empresa/cadastrar';

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'aplication/json'
    })
  };

  constructor(private httpClient: HttpClient) {

  }

  enviarCamposCadastroEmpresa(empresa: Empresa) {
    return this.httpClient.post(this.apiUrlCadastrar, empresa, { responseType: 'text' });
  }

  private minhaEmpresa: Empresa = {
    idIdentificacaoUsuario:'',
    cnpj_cadastro_empresa:  '',
    nome_fantasia_cadastro_empresa:  '',
    razao_social_cadastro_empresa:  '',
    telefone_cadastro_empresa:  '',
    cep_cadastro_empresa: '',
    rua_cadastro_empresa:  '',
    bairro_cadastro_empresa:  '',
    estado_cadastro_empresa:  '',
    numero_endereco_cadastro_empresa:  '',
    email_cadastro_empresa: '',
    senha_cadastro_empresa: '',
    confirmacao_senha_cadastro_empresa: ''
  }

  getEmpresa(): Empresa {
    return this.minhaEmpresa;
  }

  setEmailEmpresa(empresaRecebida: Empresa){
    this.minhaEmpresa.email_cadastro_empresa = empresaRecebida.email_cadastro_empresa
    this.minhaEmpresa.senha_cadastro_empresa = empresaRecebida.senha_cadastro_empresa
    this.minhaEmpresa.confirmacao_senha_cadastro_empresa = empresaRecebida.confirmacao_senha_cadastro_empresa
  }

  setCnpjEmpresa(empresaRecebida: Empresa){
    this.minhaEmpresa.cnpj_cadastro_empresa = empresaRecebida.cnpj_cadastro_empresa
    this.minhaEmpresa.razao_social_cadastro_empresa = empresaRecebida.razao_social_cadastro_empresa
    this.minhaEmpresa.nome_fantasia_cadastro_empresa = empresaRecebida.nome_fantasia_cadastro_empresa
    this.minhaEmpresa.telefone_cadastro_empresa = empresaRecebida.telefone_cadastro_empresa
  }

  setEnderecoEmpresa(empresaRecebida: Empresa){
    this.minhaEmpresa.cep_cadastro_empresa = empresaRecebida.cep_cadastro_empresa
    this.minhaEmpresa.rua_cadastro_empresa = empresaRecebida.rua_cadastro_empresa
    this.minhaEmpresa.bairro_cadastro_empresa = empresaRecebida.bairro_cadastro_empresa
    this.minhaEmpresa.estado_cadastro_empresa = empresaRecebida.estado_cadastro_empresa
    this.minhaEmpresa.numero_endereco_cadastro_empresa = empresaRecebida.numero_endereco_cadastro_empresa
  }

  private validarEmail = false;
  private validarSenha = false;

  validar() {
    // Lógica de autenticação
    this.validarEmail = true;
  }

  naoValidar() {
    // Lógica de logout
    this.validarEmail = false;
  }

  verificarSeEstaValidado(): boolean {
    return this.validarEmail;

  }

  validarSenhasiguais() {
    // Lógica de autenticação
    this.validarSenha = true;
  }

  naoValidarSenhaIguais() {
    // Lógica de logout
    this.validarSenha = false;
  }

  verificarSeEstaValidadoSenhaIguais(): boolean {
    return this.validarSenha;

  }

  private mensagemCadastradoComSucesso = false;

  CadastradoComSucesso() {
    // Lógica de autenticação
    this.mensagemCadastradoComSucesso = true;
  }

  naoFoiCadastradoComSucesso() {
    // Lógica de logout
    this.mensagemCadastradoComSucesso = false;
  }

  verificarCadastradoComSucesso(): boolean {
    return this.mensagemCadastradoComSucesso;
  }

}
