import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPlanAdminNewComponent } from './subscription-plan-admin-new.component';

describe('SubscriptionPlanAdminNewComponent', () => {
  let component: SubscriptionPlanAdminNewComponent;
  let fixture: ComponentFixture<SubscriptionPlanAdminNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionPlanAdminNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionPlanAdminNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
