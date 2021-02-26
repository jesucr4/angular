import { TestBed } from '@angular/core/testing';

import { ComunicacionAlertaService } from './comunicacion-alerta.service';

describe('ComunicacionAlertaService', () => {
  let service: ComunicacionAlertaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicacionAlertaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
