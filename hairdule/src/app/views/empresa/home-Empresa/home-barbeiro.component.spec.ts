import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBarbeiroComponent } from './home-Empresa.component';

describe('HomeBarbeiroComponent', () => {
  let component: HomeBarbeiroComponent;
  let fixture: ComponentFixture<HomeBarbeiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBarbeiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBarbeiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
