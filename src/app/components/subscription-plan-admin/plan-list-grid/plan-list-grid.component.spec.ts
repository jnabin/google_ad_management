import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanListGridComponent } from './plan-list-grid.component';

describe('PlanListGridComponent', () => {
  let component: PlanListGridComponent;
  let fixture: ComponentFixture<PlanListGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanListGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanListGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
