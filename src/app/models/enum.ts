export enum PartyTypes {
    Agent = 1,
    Customer = 2,
    Vendor = 3,
    CHA = 4,
    RoadTransport = 5,
    Leads = 6,
    Shipper = 7,
    Consignee = 8,
    Bank = 9,
    // OtherServiceProvider = 10,
    // Network = 11,
    CFS = 12,
    Warehouse = 13,
    // PartyAgent = 14,
    COLOAD = 15
}

export enum CarrierTypes {
    Airline = 101,
    ShippingLine = 102,
    InlandCarrier = 103,
}

export enum ChargeType {
    Prepaid = 1,
    Collect = 2
}

export enum SequenceTypes {
    Inquiry = 1,
    Quotation = 2,
    Booking = 3,
    Shipment = 4,
    HBL = 5,
    HAWB = 6,
    Invoice = 7,
    Constituent_Invoice = 8,
    Purchase_Bill = 9,
    RECEIPT = 10,
    PAYMENT = 11,
    House_CMR = 12,
    Party = 13,
    Debit_Note = 14,
    Credit_Note = 15,
    Constituent_Supplier_Invoice = 16,
    Console = 17
}

export enum SequenceSection {
    Fixed_String = 1,
    Company_Code = 2,
    Branch_Code = 3,
    Month = 4,
    Year = 5,
    Financial_Start_Year = 6,
    Financial_End_Year = 7,
    Next_Sequential_No = 8,
    Separator = 9,
    Shipment_Type_Full = 10,                // (Example AIR, SEA, INLAND)
    Shipment_Type_Notation = 11,            // (A, S, I)
    Direction_Full = 12,                    // (Export, Import)
    Direction_Notation = 13,                // (E, I)
    Sea_Or_Inland_Shipment_Type = 14,       // (FCL, LCL, FTL, LTL)
    First_Letter_of_Each_Word = 15,         // HCIL for Holcim Chemicals Industries Ltd
    First_3_Letters_of_First_Word = 16,     // HOL
    First_3_Letters_of_First_2_Words = 17   // HOLCHE
}

export enum NumberGrouping {
    space_separator,
    two_digit_separator,
    three_digit_separator,
}

export class OpportunityType {
    public static Bid: string = 'Bid';
    public static Expansion: string = 'Expansion';
    public static New_Business: string = 'New Business';
    public static Routing_Order: string = 'Routing Order';
}

export class TodoStatuses {
    public static PENDING = "PENDING";
    public static INPROGRESS = "INPROGRESS";
    public static NOTAPPLICABLE = "NOTAPPLICABLE";
    public static COMPLETED = "COMPLETED";
}

export enum OpportunityRating {
    Neutral,
    Cold,
    Hot,
    Warm,
}

export class OpportunityLeadSource {
    public static Advertisement: string = 'Advertisement';
    public static Employee_Referral: string = 'Employee Referral';
    public static External_Referral: string = 'External Referral';
    public static Other: string = 'Other';
    public static RR: string = 'RR';
    public static Seminar: string = 'Seminar';
    public static Trade_Show: string = 'Trade Show';
}

export enum OpportunityPriority {
    Normal,
    High,
    Low,
}

export class OpportunityShowTimeAs {
    public static Busy: string = 'Busy';
    public static Free: string = 'Free';
    public static Out_of_Office: string = 'Out of Office';
    public static Tentative: string = 'Tentative';
}

export enum OpportunityStatus {
    New,
    Inquiry,
    Quotation,
    Negotiation,
    Win,
    Lost,
}

export enum OpportunityActivityCallDirection {
    Incoming = 0,
    Outgoing = 1,
}

export enum FormType {
    Shipment = 0,
    Inquiry = 1,
    Opportunity = 2,
    Activity = 3,
    Company = 4,
    Quotation = 5
}

export enum ExtraInputType {
    Text = 0,
    Number = 1,
    Select = 2,
    TextArea = 3,
}

export enum CallDirection {
    Outgoing = 0,
    Incoming = 1,
}

export enum SalesActivityType {
    Task = 0,
    Call = 1,
    Appointment = 2
}

export enum SalesActivityUpdateType {
    Task = "Task",
    Call = "Call",
    Appointment = "Appointment",
    Opportunity = "Opportunity",
    Inquiry = "Inquiry",
    Quotation = "Quotation",
    Booking = "Booking",
    OpportunityLost = "OpportunityLost",
    Complete = "Complete"
}


export enum Priority {
    Low = 0,
    Normal = 1,
    High = 2,
}

export enum SalesActivityStatus {
    Complete = 0,
    New = 1,
    Rescheduled = 2,
    Lost = 3,
    Followup = 4,
    Cancel = 5,
}


export enum LostReason {
    CompetitorsRateWasLow = 0
}


export enum ShipmentType {
    Master = "Master",
    House = "House"
}

export enum ProductEnv {
    AWS = "AWS",
    FMS = "FMS"
}

export enum CompanyScreens {
    AccInfo = "AccInfo",
    BankInfo = "BankInfo",
    ShippingInfo = "ShippingInfo",
    IntegrationInfo = "IntegrationInfo",
    ModulePermission = "ModulePermission",
    AdminPermission = "AdminPermission",
    Users = "Users",
    Addresses = "Addresses",
    Services = "Services",
    Contacts = "Contacts",
    Branches = "Branches",
    Network = "Network",
    Association = "Association",
    Certification = "Certification",
    Achievement = "Achievement",
    Article = "Article",
    Document = "Document",
    References = "References",
    Company = "Company",
    Vehicles = "Vehicle"
}

export enum ContractStatus {
    Pending = "Pending",
    InProgress = "In Progress",
    ReviewinProgress = "Review in Progress",
    Completed = "Completed",
    FeedbackNeeded = "Feedback Needed",
}


export enum CompanyTitle {
    NETWORK = "Company",
    FORWARDER = 'Branch',
    AGENT = 'Agent',
    CUSTOMER = 'Customer',
    SHIPPER = 'Shipper',
    CONSIGNEE = 'Consignee',
    VENDOR = 'Vendor',
    PARTY_AGENT = 'Party Agent',
    CHA = 'Customs Agent',
    ROAD_TRANSPORT = 'Transporter',
    LEADS = 'Lead',
    BANK = 'Bank',
    OSP = 'OSP', // Other Service Provider
    NETWORK_PARTY = 'Network Party',
    COLOAD = 'Co-Load Agent',
    WAREHOUSE = 'Warehouse',
    CFS = 'CFS',
    ISSUING_CARRIER = 'Issuing Agent',
    ORIGINAGENT = 'Origin Agent',
    DESTINATIONAGENT = 'Destination Agent',
    NOTIFY = 'Notify',
    ALSO_NOTIFY = 'Also Notify'
}
export enum ShipmentDirection {
    Import = 'Import',
    Export = 'Export'
}

export enum CompanyTitlePlural {
    NETWORK = "Companies",
    FORWARDER = 'Branches',
    AGENT = 'Agents',
    // parties
    CUSTOMER = 'Customers',
    SHIPPER = 'Shippers',
    CONSIGNEE = 'Consignees',
    VENDOR = 'Vendors',
    PARTY_AGENT = 'Party Agents',
    CHA = 'Customs Agent',
    ROAD_TRANSPORT = 'Transporter',
    LEADS = 'Leads',
    BANK = 'Banks',
    OSP = 'OSP', // Other Service Provider
    NETWORK_PARTY = 'Network Parties',
    COLOAD = 'Co-Load Agents',
    WAREHOUSE = 'Warehouses',
    CFS = 'CFS',
}
export enum ObjectType {
    AIRLINE = 0,
    SHIPPING_LINE = 1,
    INLAND_CARRIER = 2,
    AIRPORTS = 3,
    PORTS = 4,
    TERMINALS = 5,
    REGION = 6,
    COUNTRY = 7,
    CITY = 8,
    COMPANY = 9,
    COMPANYBANK = 10,
    CONTAINER_SIZE = 11,
    CLAUSES = 12,
    CURRENCIES = 13,
    VESSELS = 14,
    CHARGES = 15,
    DOCUMENTTYPES = 16,
    AWB_STOCKS = 17,
    TAXMASTER = 18,
    CHARGETAX = 19,
    USER_VALUE_DETAIL = 20,
    EVENTS = 21,
    PAYMENT_TERMS = 22,

    INQUIRY = 23,
    DEPARTMENT = 24,
    USER = 25,
    ROLE = 26,
    QUOTATION = 27,
    SHIPMENT = 28, // Customer Booking
    FMS_SHIPMENT = 29 // Customer Booking


}

export enum CustomerContactType {
    User,
    Contact
}


// export enum DateTimeFormats {
//     short = "M/D/YY, hh:mm A",
//     medium = "MMM DD, YYYY, hh:mm:ss A",
//     long = "June 15, 2019 at 10:54:25 PM GMT+5",
//     Opportunity = "Opportunity",
//     Inquiry = "Inquiry",
//     Quotation = "Quotation",
//     Booking = "Booking",
//     OpportunityLost = "OpportunityLost",
//     Complete = "Complete"
// }

export enum DateTimeAngularFormats {
    short = 'short',
    medium = 'medium',
    long = 'long',
    full = 'full',
    shortDate = 'shortDate',
    mediumDate = 'mediumDate',
    longDate = 'longDate',
    longDate2 = 'longDate2',
    fullDate = 'fullDate',
    yyyy_MM_DD = "yyyy_MM_DD", // YYYY-MM-DD as 2023-03-20
    yyyy_MM_dd_hh_mm_p = "yyyy_MM_dd_hh_mm_p",// YYYY-MM-DD, HH:MM PM as 2023-03-20 10:45 PM
    yyyy_MM_dd_HH_mm = "yyyy_MM_dd_HH_mm"  // YYYY-MM-DD, HH:MM as 2023-03-20, 22:00
}


export enum DashboardNames {
    CUSTOMER_DASHBOARD = 'CUSTOMER_DASHBOARD',
    AGENT_DASHBOARD = 'AGENT_DASHBOARD',
    PRICING_DASHBOARD = 'PRICING_DASHBOARD',
    OPERATION_DASHBOARD = 'OPERATION_DASHBOARD'
}

export enum ReportType {
    CustomerWise = "CustomerWise",
    CSUWise = "CSUWise",
    CountryWise = "CountryWise",
    AgentWise = "AgentWise",
    AirlineWise = "AirlineWise",
    AccountPayables = "AccountPayables",
    AccountReceivables = "AccountReceivables",
    ConsigneeWise = "ConsigneeWise",
    ContainerDetailsByVoyage = "ContainerDetailsByVoyage",
    OpenShipmentByCustomer = "OpenShipmentByCustomer",
    OpenShipmentToClient = "OpenShipmentToClient",
    SalesPersonWise = "SalesPersonWise",
    ShipmentMIS = "ShipmentMIS",
    ShipperWise = "ShipperWise",
    ShippingLineWise = "ShippingLineWise",
    DSR = "DSR",
    JobSummary = "JobSummary",
    CustomerLedger = "CustomerLedger",
    AgentLedger = "AgentLedger",
    CashFlowRegister = "CashFlowRegister",
    SalePurchaseRegister = "SalePurchaseRegister",
    ShipmentStatistics = "ShipmentStatistics",
    ChargeWise = "ChargeWise",
    ListOfInvoices = "ListOfInvoices",
    ListOfPurchaseBills = "ListOfPurchaseBills",
    ListOfConstituentInvoices = "ListOfConstituentInvoices",
    AdvancePayments = "AdvancePayments",
    PaymentsMade = "PaymentsMade",
    AdvanceReceipts = "AdvanceReceipts",
    Receipts = "Receipts",
    ListOfDebitNote = "ListOfDebitNote",
    ListOfCreditNote = "ListOfCreditNote",
    AirBookingReport = "AirBookingReport",
    AirBooking = "AirBooking",
    AESShipment = "AESShipment",
    CargoSalesReport = "CargoSalesReport",
    UnbilledShipmentReport = "UnbilledShipmentReport",
    EAWBTransactionReport = "EAWBTransactionReport",
    EAWBTransaction = "EAWBTransaction",
    CASSBilling = "CASSBilling",
    ProfitByInvoiceAndCreditNote = "ProfitByInvoiceAndCreditNote",
    ShipmentWorkFlowReport = "ShipmentWorkFlowReport",
    UnbilledShipmentReportByUser = "UnbilledShipmentReportByUser",
    CostReportForSupplier = "CostReportForSupplier",
    ProjectedIncomingInvoice = "ProjectedIncomingInvoice",
    //SageInvoice = "SageInvoice"
}


export class KeyValue {
    public Id!: number;
    public value!: string;
}


export enum ShipmentStepIndex {
    GENERAL = "GENERAL",
    PARTIES = "PARTIES",
    PICKUP = "PICKUP",
    DELIVERY = "DELIVERY",
    ROUTING = "ROUTING",
    CONTAINER_DETAILS = "CONTAINER_DETAILS",
    TRUCK_DETAILS = "TRUCK_DETAILS",
    GOODS = "GOODS",
    CHARGES = "CHARGES",
    HANDLING = "HANDLING",
    MORE_DETAILS = "MORE_DETAILS",
    ARRIVAL = "ARRIVAL",
    EXECUTION = "EXECUTION"
}

export enum AesStepIndex {
    GENERAL = 'GENERAL',
    PARTIES = 'PARTIES',
    COMMODITY = 'COMMODITY',
    EQUIPMENT = 'EQUIPMENT'
}

export enum ISFStepIndex {
    GENERAL = 'GENERAL',
    OPERATIONAL = 'OPERATIONAL DETAILS',
    SHIPMENTREFERENCES = 'SHIPMENT REFERENCES',
    IMPORTER = 'IMPORTER DETAILS',
    OTHERPARTIES = 'OTHER PARTIES',
}

export enum CacheHolderKeys{
  OWN_BRANCH_ID = 'OWN_BRANCH_ID'
}




export enum NotificationType{
  System = 'System',
  Email = 'ToEmail'
}

export enum EmailType{
  TO = 'TO',
  BCC = 'BCC',
  CC = 'CC'
}
