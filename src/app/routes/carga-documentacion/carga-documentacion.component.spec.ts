import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaDocumentacionComponent } from './carga-documentacion.component';

describe('CargaDocumentacionComponent', () => {
  let component: CargaDocumentacionComponent;
  let fixture: ComponentFixture<CargaDocumentacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaDocumentacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaDocumentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
