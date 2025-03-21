import { TestBed } from '@angular/core/testing';

import { AgencyTeamService } from './agency-team.service';

describe('AgencyTeamService', () => {
  let service: AgencyTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencyTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
