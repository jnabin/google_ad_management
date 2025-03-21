import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { DetailComparisonPlanComponent } from './detail-comparison-plan/detail-comparison-plan.component';
import { PlanListComponent } from "./plan-list/plan-list.component";

@Component({
  selector: 'app-subscription-plan',
  imports: [NgIf, DetailComparisonPlanComponent, PlanListComponent],
  templateUrl: './subscription-plan.component.html',
  styleUrl: './subscription-plan.component.css'
})
export class SubscriptionPlanComponent {
  currentView = signal('clientView');
  isHideDetails = signal(true);
  listOfView = signal(
    [
      {name: 'Client View', code: 'clientView'},
      {name: 'Admin View', code: 'adminView'},
    ]
  );
  planList = signal([
    {category: 'Basic', price: '$9.99', duration: '/month', desc: 'Perfect for individuals getting started',
      featureList: [
      'Single user',
      'Basic features',
      'Email support',
      'Up to 3 projects'
    ], isMostPopular: false},
    {category: 'Premium', price: '$29.99', duration: '/month', desc: 'Ideal for professionals and growing teams',
      featureList: [
      'Up to 5 users',
      'Basic features',
      'Priority email support',
      'Unlimited projects'
    ], isMostPopular: true},
    {category: 'Enterprise', price: '$79.99', duration: '/month', desc: 'Complete solution for businesses and large teams',
      featureList: [
      'Unlimited users',
      'All features',
      '24/7 phone & email support',
      'Unlimited projects'
    ], isMostPopular: false}
  ]);


}
