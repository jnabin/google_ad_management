import { NgFor } from '@angular/common';
import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-plan-list',
  imports: [NgFor],
  templateUrl: './plan-list.component.html',
  styleUrl: './plan-list.component.css',
})
export class PlanListComponent {
  @Input() planList = signal<
    {
      category: string;
      price: string;
      duration: string,
      desc: string;
      featureList: string[];
      isMostPopular: boolean;
    }[]
  >([]);
}
