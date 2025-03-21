import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'reminder-noti-icon',
  imports: [RouterModule, NgIf],
  templateUrl: './reminder-noti-icon.component.html',
  styleUrl: './reminder-noti-icon.component.css'
})
export class ReminderNotiIconComponent {
  count = 1;
}
