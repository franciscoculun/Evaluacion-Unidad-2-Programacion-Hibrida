import { TestBed } from '@angular/core/testing';

import { CitasService } from './citas.service';

describe('CitasServices', () => {
  let service: CitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
