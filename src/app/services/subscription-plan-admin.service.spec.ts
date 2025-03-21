import { TestBed } from '@angular/core/testing';

import { SubscriptionPlanAdminService } from './subscription-plan-admin.service';

describe('SubscriptionPlanAdminService', () => {
  let service: SubscriptionPlanAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionPlanAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
