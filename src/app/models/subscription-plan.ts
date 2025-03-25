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
}

export class SubscriptionPlanFeatureDto{
    public SubsPlanFeatureId !: number;
    public SubsPlanFeatureName !: string;
    public SubsPlanFeatureType? : string;
    public SubsPlanFeatureValue !: number;
}