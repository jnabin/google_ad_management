import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyTeamGridComponent } from './agency-team-grid.component';

describe('AgencyTeamGridComponent', () => {
  let component: AgencyTeamGridComponent;
  let fixture: ComponentFixture<AgencyTeamGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyTeamGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyTeamGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
