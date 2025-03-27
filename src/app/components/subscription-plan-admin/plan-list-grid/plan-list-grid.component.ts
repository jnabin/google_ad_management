import { NgFor, UpperCasePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { SubscriptionPlanDto } from '../../../models/subscription-plan';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-plan-list-grid',
  imports: [UpperCasePipe, NgFor, MatIconModule, MatMenuModule, TranslateModule],
  templateUrl: './plan-list-grid.component.html',
  styleUrl: './plan-list-grid.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlanListGridComponent {
  @Input() planList = signal<SubscriptionPlanDto[]>([]);
  @Output() actionPlan: EventEmitter<any> = new EventEmitter();

  selectedRow: any | null = null;
  viewItem(element:any){
    this.actionPlan.emit({action: 'view', data: element});
  }
  editItem(element:any){
    this.actionPlan.emit({action: 'update', data: element});
  }
  deleteItem(element: any){
    this.actionPlan.emit({action: 'delete', data: element});
  }

  setSelectedRow(element: any){
    this.selectedRow = element;
  }
}
