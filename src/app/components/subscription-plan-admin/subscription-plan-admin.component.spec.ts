import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPlanAdminComponent } from './subscription-plan-admin.component';

describe('SubscriptionPlanAdminComponent', () => {
  let component: SubscriptionPlanAdminComponent;
  let fixture: ComponentFixture<SubscriptionPlanAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionPlanAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionPlanAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
