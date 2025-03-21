import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComparisonPlanComponent } from './detail-comparison-plan.component';

describe('DetailComparisonPlanComponent', () => {
  let component: DetailComparisonPlanComponent;
  let fixture: ComponentFixture<DetailComparisonPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailComparisonPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailComparisonPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
