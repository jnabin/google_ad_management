


declare var $: any;

// export abstract class MatTableColDef{
//    PropertyName: string;
//    SortProperty?: string;
//    IsSelected?: boolean;
//    Title: string;
//    IsEditable?: boolean; // this is for action column
//    CssClassProp?: string;
//    CssStyleProp?: any;
//    BindProperty?: any;
//    hoverTitle?: any;
//    CustomTemplateName?: string;
//    FooterValue?:string;
// }


export class MatTableColDef {
  public PropertyName: string = '';
  public PropertyNameExcel?: string = '';
  public SortProperty?: string = '';
  public IsSelected?: boolean = true;
  public Title: string = '';
  public IsEditable?: boolean = true; // this is for action column
  public CssClassProp?: string = '';
  public CssStyleProp?: any = '';
  public BindProperty?: any = '';
  public hoverTitle?: any = ''
  public CustomTemplateName?: string = '';
  public FooterValue?: any;
  public ExpandableSubColModel? : MatTableColDef[] = [];
  public ExpandableDataProp? : string = '';
  public filterdata? : string[] = []; // this one is for the selected items
  public colFilterData?: any[] = []; // this one is the list of items that a user can choose any from them.
  public ColFilterDataSource?:string;
  public enableColumnSearch?: boolean = false;
  public excelFileNameProp?: string;
  public hideColFromExcel?: boolean = false;
  public ColMinWidth?: number;
  public MaxLen?: number;
  public IsRequired?: boolean = false;
  public isHtmlContent?:boolean = false;
  public htmlContentProp?:string;
  public ExcelColumnTotalFunction?: string; // Totals Functions: sum : Future Dev if necessary: average, max, min, count, stdDev, var
  public ExcelColumnNumberFormat?: string; // '0.00%'

  // if we find any nested column model only then we consider these
  public ShowItemsCountInDoc?: boolean = false; //for PDF document
  public ShowCountPosition?: 'top'|'bottom' = 'bottom';
  public footerFunc?: (e:any) => any;
  public showAsHeader?:boolean = false;
  //public headerPropertiesForSummaryTable?:string[] = []; //property names



  //public FooterValue?:string;
  // private _footerVal?:string;

  // public get FooterValue(): string{
  //   return this._footerVal;
  // }

  // public set FooterValue(val){
  //   this._footerVal = val.toString();
  // }


  public mapServiceObj?(matTableColDef: MatTableColDef) {
    $.extend(this, matTableColDef);
  }
}

export class FieldDef<T> {

  //#region  some common placeholders
  public static RecipientName:string = 'RecipientName';
  //#endregion


  public PropertyName?: keyof T;
  public Title?: string;
  public BindFunction?: (t: T) => any;
  public showOnUI?: boolean = true;

  public mapServiceObj?(matTableColDef: MatTableColDef) {
    $.extend(this, matTableColDef);
  }
}
