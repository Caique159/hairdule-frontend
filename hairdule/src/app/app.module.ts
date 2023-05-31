import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './views/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './views/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CadastroEmpresa } from './views/cadastro-empresa/cadastro-empresa.component';
import { RecuperarSenhaComponent } from './views/recuperar-senha/recuperar-senha.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeBarbeiroComponent } from './views/home-Empresa/home-Empresa.component';
import { CadastroEmpresaCnpjComponent } from './views/cadastro-empresa/cadastro-empresa-cnpj/cadastro-empresa-cnpj.component';
import { CadastroEmpresaEmailComponent } from './views/cadastro-empresa/cadastro-empresa-email/cadastro-empresa-email.component';
import { CadastroEmpresaEnderecoComponent } from './views/cadastro-empresa/cadastro-empresa-endereco/cadastro-empresa-endereco.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CadastroEmpresa,
    RecuperarSenhaComponent,
    HomeBarbeiroComponent,
    CadastroEmpresaCnpjComponent,
    CadastroEmpresaEmailComponent,
    CadastroEmpresaEnderecoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],

  providers: [provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
