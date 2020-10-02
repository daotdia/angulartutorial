import { TestBed } from '@angular/core/testing';

import { ProcessFTTPMsgService } from './process-fttpmsg.service';

describe('ProcessFTTPMsgService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessFTTPMsgService = TestBed.get(ProcessFTTPMsgService);
    expect(service).toBeTruthy();
  });
});
