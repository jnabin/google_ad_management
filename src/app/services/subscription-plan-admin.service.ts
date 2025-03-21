import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { SubscriptionPlanDto } from '../models/subscription-plan';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlanAdminService extends BaseService{

  private jsonUrl = 'assets/subscription-plan.json';
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getPlans(): Observable<SubscriptionPlanDto[] | {error : string}> {
    return this.http.get<SubscriptionPlanDto[]>(this.jsonUrl).pipe(
      catchError(this.handleError<SubscriptionPlanDto[]>('getSubscriptionPlans'))
    );
  }
}
