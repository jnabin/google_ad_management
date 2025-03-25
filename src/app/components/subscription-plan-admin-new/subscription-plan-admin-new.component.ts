import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonTableComponent } from '../../common/components/common-table/common-table.component';
import { MatTableColDef } from '../../models/mat-table-col-def';
import { SubscriptionPlanAdminService } from '../../services/subscription-plan-admin.service';
import { SubscriptionPlanDto } from '../../models/subscription-plan';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionPlanFormComponent } from '../subscription-plan-admin/subscription-plan-form/subscription-plan-form.component';

@Component({
  selector: 'app-subscription-plan-admin-new',
  imports: [CommonTableComponent],
  templateUrl: './subscription-plan-admin-new.component.html',
  styleUrl: './subscription-plan-admin-new.component.css'
})
export class SubscriptionPlanAdminNewComponent implements OnInit{
  subscriptionColumnModel: MatTableColDef[] = [];
    errorMessage = signal<string | null>('');
     planService: SubscriptionPlanAdminService = inject(SubscriptionPlanAdminService);
    planList = signal<SubscriptionPlanDto[]>([]);
    billingPeriods = [
      {id: 1, name: "Monthly"},
      {id: 2, name: "Quarterly"},
      {id: 3, name: "Annually"}
    ];
      constructor(private modalService: NgbModal, private translateService: TranslateService) {
        this.loadPlans();
      }
  ngOnInit(): void {
    this.subscriptionColumnModel = [
      {
          Title: 'Plan Name',
          PropertyName: "SubsPlanName"
      },
      {
          Title: 'Plan Price',
          PropertyName: "SubsPlanPrice"
      },
      {
          Title: 'Billing Period',
          PropertyName: "CategoryName"
      },
      {
          Title: 'Status',
          PropertyName: "StatusName"
      }
  ];
}

processAction(eventData: {action: string, ele: SubscriptionPlanDto}){
  console.log(eventData.action);
  if(eventData.action == 'delete'){
    this.planList.update(x =>  x.filter(y => y.SubsPlanId != eventData.ele.SubsPlanId));
    return;
  }
  this.openModal(eventData.action, eventData.ele)
}

private loadPlans(){
  this.planService.getPlans().subscribe({
    next: (data) => {
      if('error' in data){
        this.errorMessage.set(data.error)
        this.planList.set([]);
      } else {
        data.forEach(x => x.CategoryName = this.billingPeriods.find(c => c.id == x.SubsPlanBillingPeriodId)?.name)
        this.planList.set(data);
        this.errorMessage.set(null);

        console.log(this.planList());
        console.log(this.errorMessage());
      }
    },
    error: (err) => {
      this.errorMessage.set(err.message);
      this.planList.set([]);
    }
  })
}

foo(entity: any) {
  // if (entity.Status == 'Completed') {
  //     this.canEdit = false;
  // } else {
  //     this.canEdit = true;
  // }
}

  openModal(mode: string, element:SubscriptionPlanDto | null= null) {
    let title = this.translateService.instant("SubscriptionPlanAdmin.SubscriptionPlanForm.titles.newPlan"); 
    if(mode == "update"){
      title = this.translateService.instant("SubscriptionPlanAdmin.SubscriptionPlanForm.titles.editPlan"); 
    } else if(mode == "view"){
       title = this.translateService.instant("SubscriptionPlanAdmin.SubscriptionPlanForm.titles.viewPlan"); 
    }
    const modalRef = this.modalService.open(SubscriptionPlanFormComponent,
       {
        size: 'lg',
        backdrop: 'static', 
        keyboard: false
       }
      );
      modalRef.componentInstance.mode = mode;
      modalRef.componentInstance.title = title;
    modalRef.componentInstance.planData = element ? element : new SubscriptionPlanDto();
    modalRef.componentInstance.billingPeriods = this.billingPeriods;
    // modalRef.componentInstance.roles = this.roles;

    modalRef.result.then(
      (result: SubscriptionPlanDto) => {
        if (result) {
          // Save the data returned from the modal
          console.log('Data received from modal:', result);
          result.CategoryName = this.billingPeriods.find(x => x.id == result.SubsPlanBillingPeriodId)?.name;
          this.planList.update(data => [...data, result])
          // Optionally, save it via a service or further processing
        }
      },
      (reason) => {
        console.log('Modal dismissed:', reason);
      }
    );
  }
}
