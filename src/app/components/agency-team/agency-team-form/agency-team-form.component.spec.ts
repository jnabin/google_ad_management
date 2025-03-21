import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyTeamFormComponent } from './agency-team-form.component';

describe('AgencyTeamFormComponent', () => {
  let component: AgencyTeamFormComponent;
  let fixture: ComponentFixture<AgencyTeamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyTeamFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyTeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
