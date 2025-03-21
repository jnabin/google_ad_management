import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderNotiIconComponent } from './reminder-noti-icon.component';

describe('ReminderNotiIconComponent', () => {
  let component: ReminderNotiIconComponent;
  let fixture: ComponentFixture<ReminderNotiIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReminderNotiIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReminderNotiIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
