export class AgencyFormWrapperDto{
    public AgencyFormData! : AgencyFormDto;
    public AgencyInvoiceSettingsData! : AgencyInvoiceSettingsFormDto;
}

export class AgencyFormDto{
    public AgencyId! : number;
    public AgencyCode! : string;
    public AgencyName! : string;
    public AgencyAddress! : string;
    public AgencyContactNo! : string;
    public AgencyEmail! : string;
    public AgencyWebsite! : string;
    public AgencyLogoInByte! : string;
    public AgencyFaviconInByte! : string;
    public AgencyPrimaryColorCode! : string;
    public AgencyFontColorCode! : string;
}
export class AgencyInvoiceSettingsFormDto{
    public AgencyInvoiceName! : string;
    public AgencyInvoiceAddress! : string;
    public AgencyInvoiceContactNo! : string;
    public AgencyInvoiceEmail! : string;
    public AgencyInvoiceWebsite! : string;
    public AgencyInvoiceLogoInByte! : string;
    public AgencyInvoiceSlFormat! : string;
    public IsSameAsAgency! : boolean;
}