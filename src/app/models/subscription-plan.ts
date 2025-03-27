import _ from 'lodash';
import { MatTableColDef } from './mat-table-col-def';
export class SubscriptionplanGrid{
    id!: number;
    category!: string;
}

export class SubscriptionPlanDto{
    public SubsPlanId!: number;
    public SubsPlanName!: string;
    public SubsPlanDescription!: string;
    public SubsPlanPrice!: number;
    public SubsPlanBillingPeriodId!: number;
    public SubsPlanIsActive!: boolean;
    public SubsPlanIsPopular!: boolean;
    public SubsPlanDesignerCategory!: number;
    public CategoryName?: string;
    public StatusName?: string;
    public SubsPlanFeatures!: SubscriptionPlanFeatureDto[];

    getString(){
        let r =
        this.SubsPlanName+' '+
        this.SubsPlanPrice+' '+
        this.SubsPlanName+' '+
        this.CategoryName+' '+
        this.StatusName+' ';

        return r.toLowerCase();
    }

    static columnDef(): MatTableColDef[]{
        return [
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

    mapObject(plan: SubscriptionPlanDto){
        _.assign(this, plan);
    }
}

export class SubscriptionPlanFeatureDto{
    public SubsPlanFeatureId !: number;
    public SubsPlanFeatureName !: string;
    public SubsPlanFeatureType? : string;
    public SubsPlanFeatureValue !: number;
}