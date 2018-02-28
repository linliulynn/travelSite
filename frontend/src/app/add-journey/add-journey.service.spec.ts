import { TestBed, inject } from '@angular/core/testing';

import { AddJourneyService } from './add-journey.service';

describe('AddJourneyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddJourneyService]
    });
  });

  it('should be created', inject([AddJourneyService], (service: AddJourneyService) => {
    expect(service).toBeTruthy();
  }));
});
