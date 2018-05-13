import { TestBed, inject } from '@angular/core/testing';

import { TensorflowService } from './tensorflow.service';

describe('TensorflowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TensorflowService]
    });
  });

  it('should be created', inject([TensorflowService], (service: TensorflowService) => {
    expect(service).toBeTruthy();
  }));
});
