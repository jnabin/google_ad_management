import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PlanListGridComponent } from './plan-list-grid/plan-list-grid.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionPlanDto } from '../../models/subscription-plan';
import { SubscriptionPlanFormComponent } from './subscription-plan-form/subscription-plan-form.component';
import { SubscriptionPlanAdminService } from '../../services/subscription-plan-admin.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-subscription-plan-admin',
  imports: [MatButtonModule, PlanListGridComponent, TranslateModule],
  templateUrl: './subscription-plan-admin.component.html',
  styleUrl: './subscription-plan-admin.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SubscriptionPlanAdminComponent {
  errorMessage = signal<string | null>('');
  planService: SubscriptionPlanAdminService = inject(
    SubscriptionPlanAdminService
  );
  planList = signal<SubscriptionPlanDto[]>([]);
  billingPeriods = [
    { id: 1, name: 'Monthly' },
    { id: 2, name: 'Quarterly' },
    { id: 3, name: 'Annually' },
  ];
  subscriptionPlanFeatures = [
    {id: 1, name: 'Abc', type: 'numerical'},
    {id: 2, name: 'Test', type: 'numerical'},
    {id: 3, name: 'Additional Support', type: 'boolean'}
  ];
  constructor(
    private modalService: NgbModal,
    private translateService: TranslateService
  ) {
    this.loadPlans();
  }

  private loadPlans() {
    this.planService.getPlans().subscribe({
      next: (data) => {
        if ('error' in data) {
          this.errorMessage.set(data.error);
          this.planList.set([]);
        } else {
          data.forEach(
            (x) =>
              (x.CategoryName = this.billingPeriods.find(
                (c) => c.id == x.SubsPlanBillingPeriodId
              )?.name)
          );
          this.planList.set(data);
          this.errorMessage.set(null);

          console.log(this.planList());
          console.log(this.errorMessage());
        }
      },
      error: (err) => {
        this.errorMessage.set(err.message);
        this.planList.set([]);
      },
    });
  }

  processAction(eventData: { action: string; data: SubscriptionPlanDto }) {
    console.log(eventData.action);
    if (eventData.action == 'delete') {
      this.planList.update((x) =>
        x.filter((y) => y.SubsPlanId != eventData.data.SubsPlanId)
      );
      return;
    }
    this.openModal(eventData.action, eventData.data);
  }

  openModal(mode: string, element: SubscriptionPlanDto | null = null) {
    let title = this.translateService.instant(
      'SubscriptionPlanAdmin.SubscriptionPlanForm.titles.newPlan'
    );
    if (mode == 'update') {
      title = this.translateService.instant(
        'SubscriptionPlanAdmin.SubscriptionPlanForm.titles.editPlan'
      );
    } else if (mode == 'view') {
      title = this.translateService.instant(
        'SubscriptionPlanAdmin.SubscriptionPlanForm.titles.viewPlan'
      );
    }
    const modalRef = this.modalService.open(SubscriptionPlanFormComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.componentInstance.mode = mode;
    modalRef.componentInstance.title = title;
    console.log(element);
    modalRef.componentInstance.planData = element
      ? element
      : new SubscriptionPlanDto();
      console.log(modalRef.componentInstance.planData);
    modalRef.componentInstance.billingPeriods = this.billingPeriods;
    modalRef.componentInstance.subscriptionPlanFeatures = this.subscriptionPlanFeatures;
    // modalRef.componentInstance.roles = this.roles;

    modalRef.result.then(
      (result: SubscriptionPlanDto) => {
        if (result) {
          // Save the data returned from the modal
          console.log('Data received from modal:', result);
          result.CategoryName = this.billingPeriods.find(
            (x) => x.id == result.SubsPlanBillingPeriodId
          )?.name;
          this.planList.update((data) => [...data, result]);
          // Optionally, save it via a service or further processing
        }
      },
      (reason) => {
        console.log('Modal dismissed:', reason);
      }
    );
  }
}
