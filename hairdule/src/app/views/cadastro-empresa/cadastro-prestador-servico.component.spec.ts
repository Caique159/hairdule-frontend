import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPrestadorServicoComponent } from './cadastro-prestador-servico.component';

describe('CadastroPrestadorServicoComponent', () => {
  let component: CadastroPrestadorServicoComponent;
  let fixture: ComponentFixture<CadastroPrestadorServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroPrestadorServicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroPrestadorServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
