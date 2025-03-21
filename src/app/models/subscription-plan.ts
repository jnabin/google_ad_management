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
    public SubsPlanFeatures!: string[];
}