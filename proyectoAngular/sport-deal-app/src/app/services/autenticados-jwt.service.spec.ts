import { TestBed } from '@angular/core/testing';

import { AutenticadosJwtService } from './autenticados-jwt.service';

describe('AutenticadosJwtService', () => {
  let service: AutenticadosJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticadosJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
