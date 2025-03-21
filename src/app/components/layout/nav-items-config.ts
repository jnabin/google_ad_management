import { sortBy } from "lodash";
import { ScreenFMS } from "../../models/screen-fms";
import { ModuleFMS } from "../../models/module-fms";
import { CompanyTitle } from "../../models/enum";

export class navItemsDO {
    displayName: string = '';
    disabled?: boolean = false;
    iconName: string = '';
    identifier: string | null= '';
    route?: string = '';
    children?: navItemsDO[] = [];
    permission: boolean = true;
    actionMasters?: any[] = [];
    isModule?: boolean;
    expanded?: boolean = false;
    languagePath?: string;
    realisedDisplayName?: string;
    cssStyle?: string;
}

export class NavItems {
    get pricingNavChildren() {
        return [
            {
                displayName: 'Search Rates',
                iconName: 'fa fa-search',
                route: 'search',
                identifier: ScreenFMS.SEARCH_RATES,
                permission: true,
                languagePath: 'Search Rates',
                children: [],
            },
            {
                displayName: 'Manage Rates',
                iconName: 'fa fa-globe',
                route: 'rates',
                identifier: ScreenFMS.MANAGE_RATES,
                languagePath: 'modules.Menu.Pricing.Titles.titleManageRates',
                permission: true,
                children: [],
            },
            {
                displayName: 'Inquiries',
                iconName: 'fa fa-binoculars',
                route: 'inquiries',
                identifier: ScreenFMS.INQUIRY,
                languagePath: 'modules.Menu.Pricing.Titles.titleInquiries',
                permission: true,
                children: [],
            },
            {
                displayName: 'Quotations',
                iconName: 'fa fa-clipboard',
                route: 'quotations',
                identifier: ScreenFMS.QUOTATION,
                languagePath: 'modules.Menu.Pricing.Titles.titleQuotations',
                permission: true,
                children: [],
            },
            {
                displayName: 'Customer Bookings',
                iconName: 'fa fa-map',
                route: 'customer-bookings',
                identifier: ScreenFMS.CUSTOMER_BOOKING,
                languagePath: 'modules.Menu.Pricing.Titles.titleCustomerBookings',
                permission: true,
                children: [],
            },
        ];
    }

    config: navItemsDO[] = [
        {
            displayName: 'Dashboard',
            iconName: 'fa fa-dashboard',
            identifier: ModuleFMS.Dashboard,
            route: 'dashboard',
            languagePath: 'Dashboard',
            isModule: true,
            permission: true,
            children: [
                {
                    displayName: 'Customer',
                    iconName: 'fa fa-dashboard',
                    route: 'dashboard/customer',
                    languagePath: 'modules.Menu.Dashboard.Titles.titleCustomer',
                    identifier: ScreenFMS.DASHBOARD_CUSTOMER,
                    permission: true,
                    children: [],
                },
                {
                    displayName: 'Management',
                    iconName: 'fa fa-dashboard',
                    route: 'dashboard/management',
                    languagePath: 'modules.Menu.Dashboard.Titles.titleManagement',
                    identifier: ScreenFMS.DASHBOARD_MANAGEMENT,
                    permission: true,
                    children: [],
                },
                {
                    displayName: 'Pricing',
                    iconName: 'fa fa-dashboard',
                    route: 'dashboard/pricing',
                    languagePath: 'modules.Menu.Dashboard.Titles.titlePricing',
                    identifier: ScreenFMS.DASHBOARD_PRICING,
                    permission: true,
                    children: [],
                },
                {
                    displayName: 'Agent',
                    iconName: 'fa fa-dashboard',
                    route: 'dashboard/agent',
                    languagePath: 'modules.Menu.Dashboard.Titles.titleAgent',
                    identifier: ScreenFMS.DASHBOARD_AGENT,
                    permission: true,
                    children: [],
                },
                {
                    displayName: 'Operations',
                    iconName: 'fa fa-dashboard',
                    route: 'dashboard/operation',
                    languagePath: 'modules.Menu.Dashboard.Titles.titleOperations',
                    identifier: ScreenFMS.DASHBOARD_USR_OPERATION,
                    permission: true,
                    children: [],
                },
            ],
        },
        {
            displayName: 'Admin',
            iconName: 'fa fa-universal-access',
            route: 'admin',
            languagePath: 'modules.Menu.Admin.Titles.titleAdmin',
            isModule: true,
            identifier: ModuleFMS.Admin,
            permission: true,
            children: [
                {
                    displayName: 'Company Details',
                    iconName: 'fa fa-users',
                    route: 'admin/company-details',
                    languagePath: 'modules.Menu.Admin.Titles.titleCompanyDetails',
                    identifier: ScreenFMS.USER,
                    permission: true,
                    children: [],
                },
                {
                    displayName: 'Departments & Roles',
                    iconName: 'fa fa-vcard',
                    route: 'admin/department',
                    permission: false,
                    identifier: ScreenFMS.DEPARTMENT,
                    languagePath: 'modules.Menu.Admin.Titles.titleDepartmentsRoles',
                    children: [],
                },
                {
                    displayName: 'System Preferences',
                    iconName: 'fa fa-gears',
                    route: 'admin/system-preferences',
                    permission: true,
                    identifier: ScreenFMS.SYSTEM_PARAMETERS,
                    languagePath: 'modules.Menu.Admin.Titles.titleSystemPreferences',
                    children: [],
                },
                {
                    displayName: 'Form Extra Inputs',
                    iconName: 'far fa-align-left',
                    route: 'admin/extra-form-inputs',
                    permission: true,
                    identifier: ScreenFMS.FORM_EX_INPUTS,
                    languagePath: 'modules.Menu.Admin.Titles.titleFormExtraInputs',
                    children: [],
                },
                {
                    displayName: 'Approval Settings',
                    iconName: 'fa fa-check',
                    route: 'admin/approvals',
                    identifier: ScreenFMS.APPROVAL_SETTINGS,
                    permission: true,
                    languagePath: 'modules.Menu.Admin.Titles.titleApprovalSettings',
                    children: [],
                },
                {
                    displayName: 'Notification Settings',
                    iconName: 'fa fa-bell',
                    route: 'admin/notification-settings',
                    identifier: ScreenFMS.NOTIFICATION_SETTINGS,
                    permission: true,
                    languagePath: 'modules.Menu.Admin.Titles.titleNotificationSettings',
                    children: [],
                },
                {
                    displayName: 'Rule Builder',
                    iconName: 'fas fa-ruler-triangle',
                    route: 'admin/rule-builder',
                    identifier: ScreenFMS.RULE_BUILDER,
                    permission: true,
                    languagePath: 'modules.Menu.Admin.Titles.titleRuleBuilder',
                    children: [],
                },
                {
                    displayName: 'Audit Log Settings',
                    iconName: 'fa fa-files-o',
                    route: 'admin/audit-log-settings',
                    identifier: ScreenFMS.AUDIT_LOG_SETTINGS,
                    permission: true,
                    languagePath: 'modules.Menu.Admin.Titles.titleAuditLogSettings',
                    children: [],
                },
                {
                    displayName: 'Shipment Workflow',
                    iconName: 'fa fa-tasks',
                    route: 'admin/shipment-workflow',
                    identifier: ScreenFMS.SHIPMENT_WORKFLOW,
                    permission: true,
                    languagePath: 'modules.Menu.Admin.Titles.titleTaskManager',
                    children: [],
                },
                {
                    displayName: 'Role Config',
                    iconName: 'far fa-hat-cowboy',
                    permission: true,
                    languagePath: 'modules.Menu.Admin.Titles.titleRoleConfig',
                    identifier: ScreenFMS.ROLE_CONFIG,
                    route: 'admin/role-config',
                    children: [],
                },
                {
                    displayName: 'Language Setup',
                    iconName: 'far fa-globe-americas',
                    route: 'admin/language-setup',
                    identifier: ScreenFMS.LANGUAGE_SETUP,
                    permission: true,
                    languagePath: 'modules.Menu.Admin.Titles.titleLanguageSetup',
                    children: [],
                },
            ],
        },
        {
            displayName: 'Masters',
            iconName: 'fa fa-table',
            languagePath: 'Master',
            route: 'master',
            isModule: true,
            permission: true,
            identifier: ModuleFMS.Master,
            children: [
                {
                    displayName: 'Carriers',
                    iconName: 'fa fa-folder',
                    route: 'master/carriers',
                    languagePath: 'modules.Menu.Masters.Titles.titleCarriers',
                    identifier: null,
                    permission: true,
                    children: [
                        {
                            displayName: 'Airlines',
                            iconName: 'fa fa-folder',
                            route: `master/carriers/AIRLINE`,
                            languagePath: 'modules.Menu.Masters.Titles.titleAirlines',
                            identifier: ScreenFMS.AIRLINE,
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'Shipping Lines',
                            iconName: 'fa fa-folder',
                            route: `master/carriers/SHIPPING_LINE`,
                            languagePath: 'modules.Menu.Masters.Titles.titleShippingLines',
                            identifier: ScreenFMS.SHIPPING_LINE,
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'Inland Carriers',
                            iconName: 'fa fa-folder',
                            route: `master/carriers/INLAND_CARRIER`,
                            languagePath: 'modules.Menu.Masters.Titles.titleInlandCarriers',
                            identifier: ScreenFMS.INLAND_CARRIER,
                            permission: true,
                            children: [],
                        },
                    ],
                },
                {
                    displayName: 'Locations',
                    iconName: 'fa fa-folder',
                    route: 'master/locations',
                    languagePath: 'modules.Menu.Masters.Titles.titleLocations',
                    identifier: null,
                    permission: true,
                    children: [
                        {
                            displayName: 'Airports',
                            iconName: 'fa fa-folder',
                            route: `master/locations/AIRPORTS`,
                            identifier: ScreenFMS.AIRPORT,
                            languagePath: 'modules.Menu.Masters.Titles.titleAirports',
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'Ports',
                            iconName: 'fa fa-folder',
                            route: `master/locations/PORTS`,
                            languagePath: 'modules.Menu.Masters.Titles.titlePorts',
                            identifier: ScreenFMS.PORT,
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'Terminals',
                            iconName: 'fa fa-folder',
                            route: `master/locations/TERMINALS`,
                            languagePath: 'modules.Menu.Masters.Titles.titleTerminals',
                            identifier: ScreenFMS.TERMINALS,
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'Regions',
                            iconName: 'fa fa-folder',
                            route: `master/locations/REGION`,
                            languagePath: 'modules.Menu.Masters.Titles.titleRegions',
                            identifier: ScreenFMS.REGION,
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'Countries',
                            iconName: 'fa fa-folder',
                            route: `master/locations/COUNTRY`,
                            languagePath: 'modules.Menu.Masters.Titles.titleCountries',
                            identifier: ScreenFMS.COUNTRY,
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'Cities',
                            iconName: 'fa fa-folder',
                            route: `master/locations/CITY`,
                            languagePath: 'modules.Menu.Masters.Titles.titleCities',
                            identifier: ScreenFMS.CITY,
                            permission: true,
                            children: [],
                        },
                    ],
                },
                {
                    displayName: 'Parties',
                    iconName: 'fa fa-folder',
                    route: 'master/parties',
                    languagePath: 'modules.Menu.Masters.Titles.titleParties',
                    identifier: null,
                    permission: true,
                    children: [
                        {
                            displayName: CompanyTitle.AGENT,
                            iconName: 'fa fa-folder',
                            route: ``,
                            identifier: ScreenFMS.AGENT,
                            languagePath: 'modules.Menu.Masters.Titles.titleAgent',
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: CompanyTitle.CUSTOMER,
                            iconName: 'fa fa-folder',
                            route: ``,
                            languagePath: 'modules.Menu.Masters.Titles.titleCustomer',
                            identifier: ScreenFMS.CUSTOMER,
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: CompanyTitle.SHIPPER,
                            iconName: 'fa fa-folder',
                            route: ``,
                            languagePath: 'modules.Menu.Masters.Titles.titleShipper',
                            identifier: ScreenFMS.SHIPPER,
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: CompanyTitle.CONSIGNEE,
                            iconName: 'fa fa-folder',
                            route: ``,
                            languagePath: 'modules.Menu.Masters.Titles.titleConsignee',
                            identifier: ScreenFMS.CONSIGNEE,
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: CompanyTitle.CHA,
                            iconName: 'fa fa-folder',
                            route: ``,
                            identifier: ScreenFMS.CHA,
                            languagePath: 'modules.Menu.Masters.Titles.titleCustomsAgent',
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: CompanyTitle.ROAD_TRANSPORT,
                            iconName: 'fa fa-folder',
                            route: ``,
                            languagePath: 'modules.Menu.Masters.Titles.titleTransporter',
                            identifier: ScreenFMS.ROAD_TRANSPORT,
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: CompanyTitle.BANK,
                            iconName: 'fa fa-folder',
                            route: ``,
                            languagePath: 'modules.Menu.Masters.Titles.titleBank',
                            identifier: ScreenFMS.BANK,
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: CompanyTitle.COLOAD,
                            iconName: 'fa fa-folder',
                            route: ``,
                            languagePath: 'modules.Menu.Masters.Titles.titleCoLoadAgent',
                            identifier: ScreenFMS.COLOAD,
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: CompanyTitle.WAREHOUSE,
                            iconName: 'fa fa-folder',
                            route: ``,
                            languagePath: 'modules.Menu.Masters.Titles.titleWarehouse',
                            identifier: ScreenFMS.WAREHOUSE,
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: CompanyTitle.CFS,
                            iconName: 'fa fa-folder',
                            route: ``,
                            languagePath: 'modules.Menu.Masters.Titles.titleCFS',
                            identifier: ScreenFMS.CFS,
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: CompanyTitle.VENDOR,
                            iconName: 'fa fa-folder',
                            route: ``,
                            languagePath: 'modules.Menu.Masters.Titles.titleVendor',
                            identifier: ScreenFMS.VENDOR,
                            permission: true,
                            children: [],
                        },
                    ],
                },
                {
                    displayName: 'Others',
                    iconName: 'fa fa-folder',
                    identifier: null,
                    languagePath: 'modules.Menu.Masters.Titles.titleOthers',
                    route: 'master/others',
                    permission: true,
                    children: [
                        {
                            displayName: 'Container Sizes and Types',
                            iconName: 'fa fa-folder',
                            route: `master/others/CONTAINERSIZE`,
                            identifier: ScreenFMS.CONTAINERSIZE,
                            languagePath: 'modules.Menu.Masters.Titles.titleContainerSizesTypes',
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'Clauses & Descriptions',
                            iconName: 'fa fa-folder',
                            route: `master/others/TC`,
                            identifier: ScreenFMS.TERMS_CONDITION,
                            languagePath: 'modules.Menu.Masters.Titles.titleClauses',
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'Currencies',
                            iconName: 'fa fa-folder',
                            route: `master/others/CURRENCY`,
                            identifier: ScreenFMS.CURRENCY,
                            languagePath: 'modules.Menu.Masters.Titles.titleCurrencies',
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'Vessels',
                            iconName: 'fa fa-folder',
                            route: `master/others/VESSEL`,
                            identifier: ScreenFMS.VESSEL,
                            languagePath: 'modules.Menu.Masters.Titles.titleVessels',
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'Charges',
                            iconName: 'fa fa-folder',
                            route: `master/others/CHARGES`,
                            languagePath: 'modules.Menu.Masters.Titles.titleCharges',
                            identifier: ScreenFMS.CHARGES,
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'Commodities',
                            iconName: 'fa fa-folder',
                            route: `master/others/COMMODITY`,
                            identifier: ScreenFMS.COMMODITY,
                            languagePath: 'modules.Menu.Masters.Titles.titleCommodities',
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'Document Types',
                            iconName: 'fa fa-folder',
                            route: `master/others/DOCUMENTTYPE`,
                            identifier: ScreenFMS.DOCUMENTTYPE,
                            languagePath: 'modules.Menu.Masters.Titles.titleDocumentTypes',
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'AWB Stock Master',
                            iconName: 'fa fa-folder',
                            route: `master/others/AWB_STOCK`,
                            identifier: ScreenFMS.AWB_STOCK,
                            languagePath: 'modules.Menu.Masters.Titles.titleAWBStockMaster',
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'Tax Master',
                            iconName: 'fa fa-folder',
                            route: `master/others/TAXMASTER`,
                            languagePath: 'modules.Menu.Masters.Titles.titleTaxMaster',
                            identifier: ScreenFMS.TAX,
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'Charge Tax',
                            iconName: 'fa fa-folder',
                            route: `master/others/CHARGETAX`,
                            identifier: ScreenFMS.CHARGE_TAX,
                            languagePath: 'modules.Menu.Masters.Titles.titleChargeTax',
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'User Value Detail',
                            iconName: 'fa fa-folder',
                            route: `master/others/custom/USER_VALUE_DETAIL`,
                            identifier: ScreenFMS.USER_VALUE_DETAIL,
                            permission: true,
                            languagePath: 'modules.Menu.Masters.Titles.titleUserValueDetail',
                            children: [],
                        },
                        {
                            displayName: 'Events',
                            iconName: 'fa fa-folder',
                            route: `master/others/EVENTS`,
                            identifier: ScreenFMS.EVENTS,
                            languagePath: 'modules.Menu.Masters.Titles.titleEvents',
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'Payment Term',
                            iconName: 'fa fa-folder',
                            route: `master/others/PAYMENT_TYPE`,
                            identifier: ScreenFMS.PAYMENT_TYPE,
                            languagePath: 'modules.Menu.Masters.Titles.titlePaymentTerm',
                            permission: true,
                            children: [],
                        },
                    ],
                },
            ],
        },
        {
            displayName: 'Member-Member Data Share',
            iconName: 'fa fa-handshake-alt',
            identifier: ModuleFMS.MMDataShare,
            isModule: true,
            languagePath: 'modules.Menu.MMDataShare.titles.titleMemberMemberDataShare',
            permission:true,
            route: 'mm-data-share',
            children: [
                {
                    displayName: 'My Profile',
                    iconName: 'fa fa-user',
                    languagePath: 'modules.Menu.MMDataShare.titles.titleMyProfile',
                    route: `mm-data-share/my-profile`,
                    identifier: ScreenFMS.MM_MY_PROFILE,
                    permission: true,
                    children: [],
                },
                {
                    displayName: 'My Partners',
                    iconName: 'fa fa-handshake-alt',
                    languagePath: 'modules.Menu.MMDataShare.titles.titleMyPartners',
                    route: `mm-data-share/my-partners`,
                    identifier: ScreenFMS.MM_MY_PARTNERS,
                    permission: true,
                    children: [],
                },
                {
                    displayName: 'Search Partners',
                    iconName: 'fa fa-search',
                    languagePath: 'modules.Menu.MMDataShare.titles.titleSearchPartners',
                    route: `mm-data-share/search-partners`,
                    identifier: ScreenFMS.MM_SEARCH_PARTNERS,
                    permission: true,
                    children: [],
                },
                {
                    displayName: 'New Requests',
                    iconName: 'fa fa-plus-circle',
                    languagePath: 'modules.Menu.MMDataShare.titles.titleNewRequests',
                    route: `mm-data-share/new-requests`,
                    identifier: ScreenFMS.MM_NEW_REQUESTS,
                    permission: true,
                    children: [],
                },
            ],
        },
        {
            displayName: 'Sales',
            iconName: 'fa fa-chart-line',
            identifier: ModuleFMS.Sales,
            isModule: true,
            languagePath: 'modules.Menu.Sales.Titles.titleSales',
            permission:true,
            route: 'sales',
            children: [
                {
                    displayName: 'Leads',
                    iconName: 'fa fa-folder',
                    languagePath: 'modules.Menu.Sales.Titles.titleLeads',
                    route: `sales/leads`,
                    identifier: ScreenFMS.LEADS,
                    permission: true,
                    children: [],
                },
                {
                    displayName: 'Opportunities',
                    iconName: 'fa fa-folder',
                    permission: true,
                    route: 'sales/opportunities',
                    languagePath: 'modules.Menu.Sales.Titles.titleOpportunities',
                    identifier: ScreenFMS.SALES,
                    children: [],
                },
                {
                    displayName: 'Activities',
                    iconName: 'fa fa-folder',
                    permission: true,
                    identifier: ScreenFMS.SALES_TASKS,
                    languagePath: 'modules.Menu.Sales.Titles.titleActivities',
                    route: 'sales/activities',
                    children: [],
                },
            ],
        },
        {
            displayName: 'Pricing',
            iconName: 'fa fa-folder',
            route: 'pricing',
            languagePath: 'Pricing',
            isModule: true,
            identifier: ModuleFMS.Pricing,
            permission:true,
            children: this.pricingNavChildren,
        },
        {
            displayName: 'Operations',
            iconName: 'fa fa-globe',
            route: 'shipments-new',
            isModule: true,
            languagePath: 'modules.Menu.Operations.Titles.titleOperations',
            identifier: ModuleFMS.Operations,
            permission: true,
            // add more permissions when screens are added
            children: [
                {
                    displayName: 'Air Export',
                    iconName: 'fa fa-plane',
                    cssStyle: 'transform: rotate(180deg);',
                    route: 'shipments-new/air-export',
                    identifier: ScreenFMS.SHIPMENT_MASTER_AWB,
                    permission: true,
                    languagePath: 'modules.Menu.Operations.Titles.titleAirExport',
                    children: [
                        {
                            displayName: 'New Bookings',
                            iconName: 'fa fa-map',
                            route: 'shipments-new/bookings/air-export',
                            identifier: ScreenFMS.NEW_BOOKING,
                            languagePath: 'modules.Menu.Operations.Titles.titleNewBookings',
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'Shipments',
                            iconName: 'fa fa-cube',
                            identifier: ScreenFMS.SHIPMENT_LISTING,
                            route: true
                                ? 'shipments-new/air-export/customer-shipments-list'
                                : 'shipments-new/air-export/shipments-list',
                            // route: 'shipments-new/air-export/shipments-list',
                            languagePath: 'modules.Menu.Operations.Titles.titleShipments',
                            permission: true,
                            children: [],
                        },
                        {
                            displayName: 'Master AWB',
                            iconName: 'fa fa-cube',
                            route: 'shipments-new/air-export/master',
                            identifier: ScreenFMS.SHIPMENT_MASTER_AWB,
                            languagePath: 'modules.Menu.Operations.Titles.titleMasterAWB',
                            permission:true,
                            children: [],
                        },
                        {
                            displayName: 'House AWB',
                            iconName: 'fa fa-cube',
                            route: 'shipments-new/air-export/house',
                            identifier: ScreenFMS.SHIPMENT_HOUSE_AWB,
                            languagePath: 'modules.Menu.Operations.Titles.titleHouseAWB',
                            permission:true,
                            children: [],
                        },
                        {
                            displayName: 'Air Tracking',
                            iconName: 'fa fa-cube',
                            route: 'shipments-new/air-export/tracking',
                            identifier: ScreenFMS.SHIPMENT_MASTER_AWB,
                            languagePath: 'modules.Menu.Operations.Titles.titleAirTracking',
                            permission:true,
                            children: [],
                        },
                        {
                            displayName: 'Customs',
                            iconName: 'fa fa-folder',
                            route: 'shipments-new/air-export/customs',
                            identifier: ModuleFMS.Customs,
                            permission:true,
                            children: [
                                {
                                    displayName: 'AES Filing',
                                    iconName: 'fa fa-cube',
                                    route: 'shipments-new/air-export/customs/aes-filing',
                                    identifier: ScreenFMS.AES_FILING,
                                    languagePath: 'modules.Menu.Operations.Titles.titleAESFiling',
                                    permission:true,
                                    children: [],
                                },
                                // {
                                //     displayName: 'ISF Filings',
                                //     iconName: 'fa fa-cube',
                                //     route: 'shipments-new/air-export/isf-filings',
                                //     identifier: ScreenFMS.ISF_FILING,
                                //     languagePath: 'modules.Menu.Operations.Titles.titleISSFiling',
                                //     permission:
                                //         FMSShipmentBC.getInstance().shipmentSelected &&
                                //         FMSShipmentBC.getInstance().shipmentAirExportSelected,
                                //     children: [],
                                // },
                            ],
                        },
                        {
                            displayName: 'Billing',
                            iconName: 'fa fa-folder',
                            route: 'shipments-new/air-export/billing',
                            languagePath: 'modules.Menu.Billing.Titles.titleBilling',
                            identifier: ModuleFMS.Billing,
                            permission:true,
                            children: [
                                {
                                    displayName: 'Invoices',
                                    iconName: 'fa fa-folder',
                                    identifier: ScreenFMS.INVOICE,
                                    route: 'shipments-new/air-export/billing/invoice-listing/',
                                    languagePath: 'modules.Menu.Billing.Titles.titleInvoices',
                                    permission:true,
                                    children: [],
                                },
                                {
                                    displayName: 'Interim Invoices',
                                    iconName: 'fa fa-folder',
                                    identifier: ScreenFMS.CONSTITUENT_INVOICE,
                                    route:
                                        'shipments-new/air-export/billing/constituent-invoice-listing/',
                                    languagePath: 'modules.Menu.Billing.Titles.titleConstituentInvoices',
                                    permission:true,
                                    children: [],
                                },
                                {
                                    displayName: 'Consolidated Invoice',
                                    iconName: 'fa fa-folder',
                                    identifier: ScreenFMS.CON_INVOICE,
                                    route:
                                        'shipments-new/air-export/billing/consolidated-invoice-listing/',
                                    languagePath: 'modules.Menu.Billing.Titles.titleConsolidatedInvoice',
                                    permission:true,
                                    children: [],
                                },
                                {
                                    displayName: 'Bills',
                                    iconName: 'fa fa-folder',
                                    identifier: ScreenFMS.PURCHASE_BILL,
                                    route:
                                        'shipments-new/air-export/billing/purchase-bill-listing/',
                                    languagePath: 'modules.Menu.Billing.Titles.titlePurchaseBills',
                                    permission:true,
                                    children: [],
                                },
                                {
                                    displayName: 'Interim Bills',
                                    iconName: 'fa fa-folder',
                                    identifier: ScreenFMS.CONSTITUENT_SUPPLIER_INVOICE,
                                    route:
                                        'shipments-new/air-export/billing/constituent-supplier-invoice-listing/',
                                    languagePath: 'modules.Menu.Billing.Titles.titleConstituentSupplierInvoices',
                                    permission:true,
                                    children: [],
                                },
                                {
                                    displayName: 'Consolidated Bills',
                                    iconName: 'fa fa-folder',
                                    identifier: ScreenFMS.CON_SUPPLIER_INVOICE,
                                    route:
                                        'shipments-new/air-export/billing/consolidated-supplier-invoice-listing/',
                                    languagePath: 'modules.Menu.Billing.Titles.titleConsolidatedSupplierInvoice',
                                    permission:true,
                                    children: [],
                                },
                                {
                                    displayName: 'Payments',
                                    iconName: 'fa fa-folder',
                                    identifier: ScreenFMS.PAYMENT,
                                    route: 'shipments-new/air-export/billing/payment-listing/',
                                    languagePath: 'modules.Menu.Billing.Titles.titlePayments',
                                    permission:true,
                                    children: [],
                                },
                                {
                                    displayName: 'Receipts',
                                    iconName: 'fa fa-folder',
                                    identifier: ScreenFMS.RECEIPT,
                                    route: 'shipments-new/air-export/billing/receipt-listing/',
                                    languagePath: 'modules.Menu.Billing.Titles.titleReceipts',
                                    permission:true,
                                    children: [],
                                },
                                // {
                                //     displayName: 'Profit Report',
                                //     iconName: 'fa fa-folder',
                                //     identifier: ScreenFMS.SHIPMENT_MASTER_AWB,
                                //     route: 'shipments-new/air-export/billing/cpa',
                                //     permission: (!FMSShipmentBC.getInstance().isShipmentNew || FMSShipmentBC.getInstance().isUnconnectedHouse) && FMSShipmentBC.getInstance().shipmentAirExportSelected,
                                //     children: [],
                                // },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            displayName: 'Accounts',
            iconName: 'fas fa-file-invoice-dollar',
            permission: true,
            identifier: ModuleFMS.Accounts,
            isModule: true,
            languagePath: 'modules.Menu.Accounts.title',
            route: 'accounts/',
            children: [
                {
                    displayName: 'Consolidated Invoice',
                    iconName: 'fas fa-file-invoice-dollar',
                    languagePath: 'modules.Menu.Accounts.titleConsolidatedInvoice',
                    route: `accounts/consolidated-invoice`,
                    identifier: ScreenFMS.ACCOUNT_CONSOLIDATED_INVOICE,
                    permission: true,
                    children: [],
                },
                {
                    displayName: 'Consolidated Bill',
                    iconName: 'fas fa-file-invoice-dollar',
                    languagePath: 'modules.Menu.Accounts.titleConsolidatedBill',
                    route: `accounts/consolidated-bill`,
                    identifier: ScreenFMS.ACCOUNT_CONSOLIDATED_BILL,
                    permission: true,
                    children: [],
                },
                // {
                //     displayName: 'CASS Invoice',
                //     iconName: 'fas fa-file-invoice-dollar',
                //     languagePath: 'modules.Menu.Accounts.titleCASSInvoice',
                //     route: `accounts/cass-invoice`,
                //     disabled: true,
                //     identifier: ScreenFMS.ACCOUNT_CASS_INVOICE,
                //     permission: true,
                //     children: [],
                // },
                {
                    displayName: 'CASS Bills',
                    iconName: 'fas fa-file-invoice-dollar',
                    languagePath: 'modules.Menu.Accounts.titleCASSBills',
                    route: `accounts/cass-bills`,
                    disabled: false,
                    identifier: ScreenFMS.ACCOUNT_CASS_BILLS,
                    permission: true,
                    children: [],
                },
                {
                    displayName: 'Receipts',
                    iconName: 'fas fa-file-invoice-dollar',
                    languagePath: 'modules.Menu.Accounts.titleReceipts',
                    route: `accounts/receipts`,
                    identifier: ScreenFMS.ACCOUNT_RECEIPTS,
                    permission: true,
                    children: [],
                },
                {
                    displayName: 'Payments',
                    iconName: 'fas fa-file-invoice-dollar',
                    languagePath: 'modules.Menu.Accounts.titlePayments',
                    route: `accounts/payments`,
                    identifier: ScreenFMS.ACCOUNT_PAYMENTS,
                    permission: true,
                    children: [],
                },
                {
                    displayName: 'Sage Invoice',
                    iconName: 'fas fa-receipt',
                    languagePath: 'modules.Menu.Accounts.titleSageInvoice',
                    route: `accounts/sage-invoice`,
                    identifier: ScreenFMS.ACCOUNT_SAGE_INVOICE,
                    permission: true,
                    children: [],
                },
            ],
        },
        
        {
            displayName: 'Uploaded Contracts',
            iconName: 'fa fa-table',
            permission: true,
            identifier: ModuleFMS.Profile,
            isModule: true,
            route: 'uploaded-contracts',
            children: [],
        },
        {
            displayName: 'Pricing Report',
            iconName: 'fa fa-table',
            permission: true,
            identifier: ModuleFMS.Profile,
            isModule: true,
            route: 'price-report',
            children: [],
        },
        {
            displayName: 'Shipment Statistics Report',
            iconName: 'fa fa-folder',
            permission: true,
            identifier: ModuleFMS.Profile, //ScreenFMS.SHIPMENT_STATISTICS_REPORT,
            route: `sti-report/common-report/`,
            children: [],
        },
        {
            displayName: 'AWS Registration',
            iconName: 'fa fa-folder',
            permission: true,
            identifier: ModuleFMS.Profile, //ScreenFMS.SHIPMENT_STATISTICS_REPORT,
            route: `aws/aws-registration`,
            children: [],
        },
        {
            displayName: 'No Rates Reports',
            iconName: 'fa fa-table',
            permission: true,
            identifier: ModuleFMS.Profile,
            isModule: true,
            route: 'no-rate-report',
            children: [],
        },
        {
            displayName: 'Switch to Customer Account',
            iconName: 'fa fa-table',
            permission: true,
            identifier: ModuleFMS.Profile,
            isModule: true,
            route: 'access',
            children: [],
        },
        {
            displayName: 'Error logs',
            iconName: 'fa fa-table',
            permission: true,
            identifier: ModuleFMS.Profile,
            isModule: true,
            route: 'error',
            children: [],
        },
        {
            displayName: 'Integration Logs',
            iconName: 'fa fa-table',
            permission: true,
            identifier: ModuleFMS.Profile,
            isModule: true,
            route: 'integration-logs',
            children: [],
        },
        {
            displayName: 'Email logs',
            iconName: 'fa fa-envelope',
            permission: true,
            identifier: ScreenFMS.EMAIL_LOGS,
            isModule: true,
            route: 'email-logs',
            children: [],
        },
        // {
        //     displayName: 'Customs Error Code',
        //     iconName: 'fa fa-envelope',
        //     permission: true,
        //     identifier: ScreenFMS.CUSTOM_ERROR_CODE,
        //     isModule: false,
        //     route: 'custom-error-code',
        //     children: [],
        // },
    ];

    sortNavItems(items: navItemsDO[]) {
        var sortedItems = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].children && (items[i].children as any[]).length > 0) {
                items[i].children = this.sortNavItems(items[i].children as navItemsDO[]);
            }
        }
        sortedItems = items;
        return sortedItems;
    }

    public async FilteredConfig(): Promise<navItemsDO[]> {
        let config = JSON.parse(JSON.stringify(this.config));
        await this.process(config);
        //config = this.sortNavItems(config)
        return config;
    }

    public getRouteByIdentifier(screenIdentifier: string): string {
        // let res = '/dashboard/pricing';
        let res:string = '/landing';
        let found = false;
        new NavItems().config.forEach((navItemsDO) => {
            if (navItemsDO.children?.length && !found) {
                let a = navItemsDO.children.find((q) => q.identifier == screenIdentifier);
                if (a && !found) {
                    if (a.children?.length) {
                        let b = a.children.find((c) => c.identifier == screenIdentifier);
                        if (b) res = b.route as string;
                    } else {
                        res = a.route as string;
                    }
                }
            }
        });
        return res;
    }

    private async process(navItemsDOs: navItemsDO[]): Promise<void> {
        for (let index = 0; index < navItemsDOs.length; index++) {
            const navItemsDO = navItemsDOs[index];

            if (!navItemsDO.children?.length) {
                let permission = false;
                permission = true;

                if (
                    navItemsDO.identifier != ScreenFMS.SHIPMENT_MASTER_AWB &&
                    navItemsDO.identifier != ScreenFMS.SHIPMENT_MASTER_CMR &&
                    navItemsDO.identifier != ScreenFMS.MASTER_BILL_OF_LADING_MBL &&
                    navItemsDO.identifier != ScreenFMS.INVOICE &&
                    navItemsDO.identifier != ScreenFMS.CONSTITUENT_INVOICE &&
                    navItemsDO.identifier != ScreenFMS.CONSTITUENT_SUPPLIER_INVOICE &&
                    navItemsDO.identifier != ScreenFMS.CON_INVOICE &&
                    navItemsDO.identifier != ScreenFMS.CON_SUPPLIER_INVOICE &&
                    navItemsDO.identifier != ScreenFMS.RECEIPT &&
                    navItemsDO.identifier != ScreenFMS.PAYMENT &&
                    navItemsDO.identifier != ScreenFMS.PURCHASE_BILL &&
                    navItemsDO.identifier != ScreenFMS.SHIPMENT_LISTING &&
                    navItemsDO.identifier != ScreenFMS.HOUSE_BILL_OF_LADING_HBL &&
                    navItemsDO.identifier != ScreenFMS.SHIPMENT_HOUSE_AWB &&
                    navItemsDO.identifier != ScreenFMS.SHIPMENT_HOUSE_CMR &&
                    navItemsDO.identifier != ScreenFMS.CUSTOMS &&
                    navItemsDO.identifier != ScreenFMS.AES_FILING &&
                    navItemsDO.identifier != ScreenFMS.ISF_FILING
                ) {
                    navItemsDO.permission = permission;
                }
                if (
                    !permission &&
                    (navItemsDO.identifier == ScreenFMS.SHIPMENT_MASTER_AWB ||
                        navItemsDO.identifier == ScreenFMS.MASTER_BILL_OF_LADING_MBL ||
                        navItemsDO.identifier == ScreenFMS.SHIPMENT_MASTER_CMR ||
                        navItemsDO.identifier == ScreenFMS.INVOICE ||
                        navItemsDO.identifier == ScreenFMS.CONSTITUENT_INVOICE ||
                        navItemsDO.identifier == ScreenFMS.CON_INVOICE ||
                        navItemsDO.identifier == ScreenFMS.CONSTITUENT_SUPPLIER_INVOICE ||
                        navItemsDO.identifier == ScreenFMS.CON_SUPPLIER_INVOICE ||
                        navItemsDO.identifier == ScreenFMS.RECEIPT ||
                        navItemsDO.identifier == ScreenFMS.PAYMENT ||
                        navItemsDO.identifier == ScreenFMS.PURCHASE_BILL ||
                        navItemsDO.identifier == ScreenFMS.CUSTOMS ||
                        navItemsDO.identifier == ScreenFMS.AES_FILING ||
                        navItemsDO.identifier == ScreenFMS.ISF_FILING ||
                        (navItemsDO.identifier != ScreenFMS.SHIPMENT_LISTING &&
                            navItemsDO.identifier != ScreenFMS.SHIPMENT_HOUSE_AWB &&
                            navItemsDO.identifier != ScreenFMS.HOUSE_BILL_OF_LADING_HBL &&
                            navItemsDO.identifier != ScreenFMS.SHIPMENT_HOUSE_CMR))
                ) {
                    navItemsDO.permission = permission;
                }
            } else {
                await this.process(navItemsDO.children);
                // for (let i = 0; i < navItemsDO.children.length; i++) {
                //     let child = navItemsDO.children[i];
                // }
                if (navItemsDO.children.find((as) => as.permission)) {
                    navItemsDO.permission = true;
                    navItemsDO.children.forEach((a) => {
                        if (a.identifier == null && a.children?.length == 0) {
                            a.permission = true;
                        }
                    });
                } else {
                    navItemsDO.permission = false;
                }
            }
            await this.navTranslate(navItemsDO);

            if (true) {
                if (
                    [
                        'Role Config',
                        'Company Details',
                        'Switch to Customer Account',
                        'Error logs',
                        'Shipment Statistics Report',
                        'AWS Registration',
                        'Integration Logs',
                        'Language Setup',
                    ].includes(navItemsDO.displayName)
                ) {
                    navItemsDO.permission = true;
                }

                if (navItemsDO.identifier == ScreenFMS.REPORT_AES_TRANSACTIONS_REPORT) {
                    navItemsDO.permission = true;
                }
            }

            if (navItemsDO.displayName == 'Uploaded Contracts') {
                navItemsDO.permission = true;
            }

            if (navItemsDO.displayName == 'Pricing Report') {
                navItemsDO.permission = true;
            }

            if (navItemsDO.displayName == 'No Rates Reports') {
                navItemsDO.permission = true;
            }

            if (navItemsDO.displayName == 'Error logs' || navItemsDO.displayName == 'Switch to Customer Account') {
                navItemsDO.permission = true;
            }
            if (navItemsDO.displayName == 'Email logs') {
                navItemsDO.permission = true;
            }
            if (navItemsDO.displayName == 'Booking Send Reports') {
                navItemsDO.permission = true;
            }
            if (navItemsDO.displayName == 'AES Shipment') {
                navItemsDO.permission = true;
            }
            if (navItemsDO.displayName == 'eAWB Transaction Reports') {
                navItemsDO.permission = true;
            }
            // if (navItemsDO.displayName == 'Customs Error Code') {
            //     navItemsDO.permission = UserBC.getInstance().SAPerm(ScreenFMS.CUSTOM_ERROR_CODE);
            //   }
        }
    }

    private async navTranslate(navItemsDO:navItemsDO) {
        // if (!navItemsDO.realisedDisplayName) {
        //     if (navItemsDO.languagePath) {
        //         let realisedDisplayName = await ijt.translate.get(navItemsDO.languagePath).toPromise();
        //         let langs = ijt.translate.langs;
        //         if (realisedDisplayName && langs.length > 1) navItemsDO.realisedDisplayName = realisedDisplayName;
        //     } else {
        //         navItemsDO.realisedDisplayName = navItemsDO.displayName;
        //     }
        // }
        // if (!navItemsDO.realisedDisplayName) {
        //     navItemsDO.realisedDisplayName = navItemsDO.displayName;
        // }
        return new Promise((resolve, reject) => {
            navItemsDO.realisedDisplayName = navItemsDO.languagePath?.slice(0, 10);
            resolve(navItemsDO.languagePath?.slice(0, 10));
        });
    }
}