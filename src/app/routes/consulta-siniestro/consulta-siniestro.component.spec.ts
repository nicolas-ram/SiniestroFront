import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaSiniestroComponent } from './consulta-siniestro.component';

describe('ConsultaSiniestroComponent', () => {
  let component: ConsultaSiniestroComponent;
  let fixture: ComponentFixture<ConsultaSiniestroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaSiniestroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaSiniestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
