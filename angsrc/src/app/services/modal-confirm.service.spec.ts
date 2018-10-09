import { TestBed } from '@angular/core/testing';

import { ModalConfirmService } from './modal-confirm.service';

describe('ModalConfirmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalConfirmService = TestBed.get(ModalConfirmService);
    expect(service).toBeTruthy();
  });
});
