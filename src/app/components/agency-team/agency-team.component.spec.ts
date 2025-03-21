import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyTeamComponent } from './agency-team.component';

describe('AgencyTeamComponent', () => {
  let component: AgencyTeamComponent;
  let fixture: ComponentFixture<AgencyTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
