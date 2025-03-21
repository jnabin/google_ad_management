import { NgFor, UpperCasePipe } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { SubscriptionPlanDto } from '../../../models/subscription-plan';

@Component({
  selector: 'app-plan-list-grid',
  imports: [UpperCasePipe, NgFor, MatIconModule, MatMenuModule],
  templateUrl: './plan-list-grid.component.html',
  styleUrl: './plan-list-grid.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlanListGridComponent {
  @Input() planList = signal<SubscriptionPlanDto[]>([]);
  @Output() actionPlan: EventEmitter<any> = new EventEmitter();

  selectedRow: any | null = null;
  viewItem(element:any){
    this.actionPlan.emit({action: 'view', ele: element});
  }
  editItem(element:any){
    this.actionPlan.emit({action: 'update', ele: element});
  }
  deleteItem(element: any){
    this.actionPlan.emit({action: 'delete', ele: element});
  }

  setSelectedRow(element: any){
    this.selectedRow = element;
  }
}
