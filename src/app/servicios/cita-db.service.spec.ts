import { TestBed } from '@angular/core/testing';

import { CitaDbService } from './cita-db.service';

describe('CitaDbService', () => {
  let service: CitaDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitaDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
