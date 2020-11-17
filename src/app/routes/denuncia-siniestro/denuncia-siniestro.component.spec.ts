import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciaSiniestroComponent } from './denuncia-siniestro.component';

describe('DenunciaSiniestroComponent', () => {
  let component: DenunciaSiniestroComponent;
  let fixture: ComponentFixture<DenunciaSiniestroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenunciaSiniestroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenunciaSiniestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
