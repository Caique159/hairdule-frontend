import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroempresaenderecoComponent } from './cadastro-empresa-endereco.component';

describe('CadastroempresaenderecoComponent', () => {
  let component: CadastroempresaenderecoComponent;
  let fixture: ComponentFixture<CadastroempresaenderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroempresaenderecoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroempresaenderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
