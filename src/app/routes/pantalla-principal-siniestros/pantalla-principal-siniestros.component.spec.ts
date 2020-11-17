import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaPrincipalSiniestrosComponent } from './pantalla-principal-siniestros.component';

describe('PantallaPrincipalSiniestrosComponent', () => {
  let component: PantallaPrincipalSiniestrosComponent;
  let fixture: ComponentFixture<PantallaPrincipalSiniestrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PantallaPrincipalSiniestrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallaPrincipalSiniestrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
