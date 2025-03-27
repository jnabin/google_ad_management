import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuPanel, MatMenuTrigger } from '@angular/material/menu';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatHeaderCell,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import {
  BehaviorSubject,
  combineLatest,
  of,
  Subject,
  Subscription,
} from 'rxjs';
// import pdfMake from 'pdfmake/build/pdfmake.min';
import { filter, map, sortBy, uniq, intersection } from 'lodash';

import { isDate } from 'moment-timezone';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as exceljs from 'exceljs';
import * as FileSaver from 'file-saver';
import { combineAll, debounce, debounceTime, mergeAll } from 'rxjs/operators';
import * as pdfMake from 'pdfmake/build/pdfmake';
import {
  Column,
  Content,
  ContentTable,
  ContentText,
  CustomTableLayout,
  PageSize,
  Size,
  TableLayout,
  TableOfContent,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { PdfMakerService } from '../../services/pdf-maker.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as htmlToImage from 'html-to-image';
import { convert } from 'html-to-text';
import { MatTableColDef } from '../../../models/mat-table-col-def';
import { Guid } from '../../../models/guid';
import { UserPreferenceVersions } from '../../../models/user-preference-version';
import { UserPreference } from '../../../models/user-preference';
import { EditTableColumnSelectionComponent } from '../edit-table-column-selection/edit-table-column-selection.component';
import { Standard } from '../../standard';
import { CommonTableConfigBC } from './common-table-config-bc';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {
  NgLabelTemplateDirective,
  NgOptionTemplateDirective,
  NgSelectComponent,
} from '@ng-select/ng-select';
import { StriptTagPipe } from '../../pipes/stript-tag.pipe';
import { MatIconModule } from '@angular/material/icon';
import { StylePaginatorDirective } from '../../directives/style-paginator.directive';
import { CustomPaginatorIntl } from '../../services/custom-paginator-intl.service';
//pdfMake.vfs = pdfFonts?.pdfMake?.vfs;
// declare var ColumnResizer;

declare var $: any;

@Component({
  selector: 'app-common-table',
  imports: [
    CommonModule,
    TranslateModule,
    MatPaginatorModule,
    FormsModule,
    NgOptionTemplateDirective,
    MatSortModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    StriptTagPipe,
    MatProgressSpinnerModule,
    NgSelectComponent,
    StylePaginatorDirective
  ],
  providers: [
  ],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.css',
})
export class CommonTableComponent implements OnInit {
  getModalRef(): ElementRef<any> {
    throw new Error('Method not implemented.');
  }
  // @Input() tableId: string // this id must be unique
  @Input() noOptions: boolean = false;
  @Input() canCreate: boolean = false;
  @Input() canView: boolean = true;
  @Input() canEdit: boolean = false;
  @Input() canDuplicate: boolean = false;
  @Input() canDelete: boolean = false;
  @Input() canDownload: boolean = false;
  @Input() showFooter: boolean = false;
  @Input() canGenerate: boolean = false;
  @Input() canRemind: boolean = false;
  @Input() canDownloadPdf: boolean = false;
  @Input() canSelect: boolean = false;
  @Input() hasOption1: boolean = false;
  @Input() canResendEmail: boolean = false;
  @Input() reminderUrl?: string;
  @Input() reminderUseIdFunction: boolean = false;
  @Input() title: string = '';
  @Input() type: string = 'NA';
  @Input() enableSort: boolean = true;
  @Input() enablePagination: boolean = true;
  @Input() enableSearch: boolean = false;
  @Input() showSearchBox: boolean = true;
  @Input() showActions: boolean = true;
  @Input() showActiveAction: boolean = false; //depricated
  @Input() activePropName!: string; // depricated
  @Input() searchTitle: string | null = null;
  @Input() canOptionalAction: boolean = false;
  @Input() optionalActionTitle?: string;
  @Input() optionalActionIconClassList?: string;
  @Input() showImportButton: boolean = false;
  @Input() disableAddButton: boolean = false;
  @Input() disableImportButton: boolean = false;
  @Input() showColumnReOrderButton: boolean = false;
  @Output() addSchedule = new EventEmitter<any | { data: any }>();
  @Output() addInnerSchedule = new EventEmitter<any | { data: any }>();
  searchText: string = '';
  @Input() showDefaultActions: boolean = true;
  @Input() tableActionMenu!: MatMenuPanel<any>;
  @Input() createActionMenu!: MatMenuPanel<any>;
  @Input() loading: boolean = false;
  @Input() desc: string = '';
  @Input() BASE_LANG = 'commonTable';
  @Input() enableHorizontalScroll: boolean = false; // depricated. Don't use this anymore
  _enableHorizontalScroll: boolean = false;
  @Input() isCreateMenu: boolean = false;
  @Input() showBorder: boolean = true;
  @Input() minimizeTopSection: boolean = false;
  @Input() fixedPageSize: number = 0;
  @Input() preventViewEntityFromRowClick: boolean = false;
  @Input() createNewBtnString?: string;
  @Input() templateRef1!: TemplateRef<any>; //custom colum 1
  @Input() templateRef2!: TemplateRef<any>; //custom colum 2
  @Input() templateRef3!: TemplateRef<any>; //custom colum 3
  @Input() templateRef4!: TemplateRef<any>; //custom colum 4
  @Input() templateRef5!: TemplateRef<any>; //custom colum 5
  @Input() templateRef6!: TemplateRef<any>; //custom colum 6
  @Input() actionTemplate!: TemplateRef<any>; // action column template
  @Input() filterTemplate!: TemplateRef<any>; // for placing the filters beside the search box
  @Input() isUnbilledShipmentReport: boolean = false;
  @Input() option1Title?: string;
  @Input() emitWithRow: boolean = false;
  @Input() clearSearchText: boolean = true;
  @Input() max_height: string = '65vh';
  @Input() isValid: boolean = true;
  @Input() canSendEmail: boolean = false;
  @Input() emailSubject: string = '';
  @Input() excelFileName: string | null = null;
  enableColumnSearch: boolean = false;
  @Input() fromportalActivity: boolean = true;
  @Input() fromDate?: NgbDateStruct;
  @Input() toDate?: NgbDateStruct;
  @Input() isReport: boolean = false;
  @Input() enableDefaultPDF: boolean = true;
  @Input() enableDefaultExcel: boolean = true;
  // @Input() footerColumns: {Name: number, Value: string}[] = [ {PropertyName: 'ClosingDate', value: 'Total'}, {index: 1, value:'$500'}];
  @Input() screenIdentifier?: string;

  @Output() create = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() select = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() optionalAction = new EventEmitter<any>();
  @Output() view = new EventEmitter<
    any | { data: any; column: MatTableColDef }
  >();
  @Output() downloadPdf = new EventEmitter<
    any | { data: any; column: MatTableColDef }
  >();
  //@Output() generateExcel = new EventEmitter<any | { data: any; column: MatTableColDef }>();
  @Output() toggleActiveStatus = new EventEmitter<any>();
  @Output() duplicate = new EventEmitter<any>();
  @Output() generate = new EventEmitter<any>();
  @Output() import = new EventEmitter<any>();
  @Output() resendEmail = new EventEmitter<any>();
  @Output() actionMenuClicked = new EventEmitter<any>();
  @Output() option1Changed = new EventEmitter<any>();
  @Output() columnConfigChanged = new EventEmitter<MatTableColDef[]>();
  @Input() isFromDefaultCharge: boolean = false;
  @Input() parentTable?: CommonTableComponent;
  @ViewChild(MatMenuTrigger, { static: false }) matMenuTrigger?: MatMenuTrigger;
  @ViewChild(MatSort, { static: true }) _sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) _paginator!: MatPaginator;
  // @ViewChildren("grabber") grabbers:QueryList<any>;
  // @ViewChild(MatHeaderCell) headerCell:ElementRef;
  t_id: string = Guid.newGuid();
  printSectionId: string = Guid.newGuid();
  _data = [];
  selected: any;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  colWidth: number = 100;
  selectedPageSize: number = 5;
  colResizer: any;
  cellMaxChar: number = 32767;
  filters: Event[] = [];
  $viewInitiated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  $dataBuilt: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  grabberAdded: boolean = false;
  changeWidth: boolean = false;
  colHeader: any; // only used for jQuery
  originalData = [];
  pdfHeaderWidth: number = 0;
  pdfFooterWidth: number = 0;
  getPDFDoc!: (e: any) => Promise<any>;
  getExcelBuffer!: (e: any) => Promise<any>;
  @Input() set data(values: any) {
    if (!values) {
      values = [];
    }
    this._data = values;
    if (this._columns && this._columns.length) {
      this.buildColumns();
    }
    this.buildData();
  }
  isShipmentListingTable: boolean = false;
  loadedData: any;
  private _columns: MatTableColDef[] = [];
  private _columnsCloneString?: string;
  private _inputColumns: MatTableColDef[] = [];
  @Input() set columns(cols: MatTableColDef[]) {
    this._inputColumns = cols.slice();
    if (cols && cols.length) {
      var _tempCols: any[] = [];
      cols.forEach((c) => {
        var _c: any = new MatTableColDef();
        _c.mapServiceObj(c);
        _tempCols.push(_c);
      });
      this._columns = _tempCols;
      this._columnsCloneString = JSON.stringify(this._columns);

      this.buildColumns();
      if (this._data && this._data.length) {
        this.buildData();
      }
    } else {
      this._columns = [];
    }
  }

  displayedColumns: any[] = [];
  all_columns: MatTableColDef[] | any[] = [];
  subs: Subscription[] = [];
  $windowResized: Subject<any> = new Subject<any>();
  headerHtmlContent?: SafeHtml | null;
  footerHtmlContent?: SafeHtml | null;

  // get NoteHtml(){
  //   let html = this.Notes ?? '';
  //   if (!this._noteHtml) {
  //       this._noteHtml = ijt.sanitizer.bypassSecurityTrustHtml(html);
  //   }
  //   return this._noteHtml;
  // }

  get searchPlaceholder(): string {
    if (this.searchTitle != null) return this.searchTitle;
    return `${'Search'} ${this.title}...`;
  }

  constructor(
    private dialog: MatDialog, 
    private sanitizer: DomSanitizer
    ) {
    //super(null);
  }

  ngOnInit(): void {
    if (this.fixedPageSize == 0) {
      try {
        this.selectedPageSize = 5;
        if (this._paginator) {
          this._paginator.pageSize = this.selectedPageSize;
        }
        if (this.dataSource.paginator?.getNumberOfPages) {
          this.dataSource.paginator.pageSize = this.selectedPageSize;
        }
      } catch (error) {
        console.error(error);
      }
    }
    this.setDisplayedColumns();

    this.subs.push(
      combineLatest([this.$dataBuilt, this.$viewInitiated, of(true)]).subscribe(
        (obj: any) => {
          if (obj[0] == true && obj[1] == true && obj[2] == true) {
            setTimeout(() => {
              this.removeColGrabbers();
              this.addColGrabbers();
            }, 500);
          }
        }
      )
    );

    this.subs.push(
      this.$windowResized.pipe(debounceTime(500)).subscribe((e) => {
        this.onWindowResied(e);
      })
    );
  }

  addColGrabbers() {
    var ths: HTMLElement[] = $(
      `table#${this.t_id} > thead > tr > th > div`
    ).get();
    ths = ths.slice(0, ths.length - 1);
    if (this.showActions || this.showColumnReOrderButton) {
    }
    ths.forEach((item) => {
      $(item).append(
        `<div #grabber class="ml-auto col-grabber" style=" padding-left:10px; height:40px; cursor: col-resize;">
                <div  class="bg-white"></div>
            </div>`
      );
      var lastItem = $(item).children().last()[0];
      $(lastItem).on('mousedown', ($event: any) => {
        this.colHeaderMouseDown($event, this);
      });
    });

    ths = $(`table#${this.t_id} > thead > tr > th`).get();
    if (this.showActions || this.showColumnReOrderButton) {
      ths = ths.slice(1);
    }

    var cols = this.all_columns.filter((col) => col.IsSelected == true);
    for (let i = 0; i < cols.length; i++) {
      if (cols[i].ColMinWidth != null) {
        $(ths[i]).css('min-width', `${cols[i].ColMinWidth}px`);
        $(ths[i]).css('width', `${cols[i].ColMinWidth}px`);
      }

      if (this.isShipmentListingTable == true) {
        if (
          cols.filter((col) => col.ColMinWidth != null && col.ColMinWidth > 0)
            .length == 0
        ) {
          var cwp = Math.floor(100 / cols.length);
          $(ths[i]).css('width', `${cwp}%`);
        } else {
          if (cols[i].ColMinWidth == null || cols[i].ColMinWidth == 0) {
            $(ths[i]).css('width', '100%');
          }
        }

        var houseTbCol = $(
          `table#${this.t_id} table.house-table tr td.mat-column-${cols[i].PropertyName}`
        ).get();
        if (cols[i].ColMinWidth != null) {
          $(houseTbCol).css('min-width', `${cols[i].ColMinWidth}px`);
        }
        $(houseTbCol).css('width', $(ths[i]).css('width'));
      }
    }
    this.grabberAdded = true;
  }

  removeColGrabbers() {
    this.grabberAdded = false;
    $(`#${this.t_id} div.col-grabber`).remove();
  }

  @HostListener('document:mouseup', ['$event'])
  colHeaderMouseUp(e: any) {
    if (this.changeWidth) {
      var ths: HTMLElement[] = $(`table#${this.t_id} > thead > tr > th`).get();
      if (this.showActions || this.showColumnReOrderButton) {
        ths = ths.slice(1);
      }

      var cols = this.all_columns.filter((col) => col.IsSelected == true);
      for (let i = 0; i < cols.length; i++) {
        cols[i].ColMinWidth = +$(ths[i]).css('min-width').replace('px', '');
        if (this.isShipmentListingTable == true) {
          var houseTbCol = $(
            `table#${this.t_id} table.house-table tr td.mat-column-${cols[i].PropertyName}`
          ).get();
          $(houseTbCol).css('min-width', `${cols[i].ColMinWidth}px`);
          $(houseTbCol).css('width', $(ths[i]).css('width'));
        }
      }

      this.changeWidth = false;
      this.colHeader = null;

      this.setUserPreferences();
    }
  }

  initColW: number = 0;
  colHeaderMouseDown(e: any, ct: any) {
    ct.changeWidth = true;
    ct.colHeader = $(e.currentTarget).parent().parent().get(0);
    ct.initColW = $(ct.colHeader).width();
    e.stopPropagation();
    e.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  ontableMouseMove(e: any) {
    if (this.changeWidth == true) {
      var w = $(this.colHeader).width();
      var minW = +$(this.colHeader).css('min-width').replace('px', '');
      //var newMinW = minW + e.movementX;
      if (minW == 0) {
        minW = w;
      }
      var newW = minW + e.movementX;
      $(this.colHeader).css('min-width', `${newW}px`);
      $(this.colHeader).width(newW);
    }
  }

  @HostListener('window:resize', ['$event'])
  windowResized(e: any) {
    this.$windowResized.next(e);
  }

  onWindowResied(e: any) {
    var tableW = $(`table#${this.t_id}`).parent().width();
    var theadW = $(`table#${this.t_id} > thead:first-child`).width();

    if (theadW > tableW && this.enableHorizontalScroll == true) {
      this._enableHorizontalScroll = true;
    } else {
      this._enableHorizontalScroll = false;
    }
  }

  ngAfterViewInit(): void {
    $(`#${this.t_id}`).css('max-height', this.max_height);
    this.$viewInitiated.next(true);
    this.windowResized(null);
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  buildColumns() {
    var cols_changed = false;
    // retrieve the user's preference
    var uf = this.getUserPreferences();

    if (
      uf != null &&
      uf.version == UserPreferenceVersions.table_col_pref_version
    ) {
      var storedCols: MatTableColDef[] = uf.preference_obj;
      if (storedCols.length != this._columns.length) {
        cols_changed = true;
      }
      for (let e of storedCols) {
        var existedCol = this._columns.find(
          (a) => a.PropertyName == e.PropertyName
        );
        if (existedCol == null) {
          cols_changed = true;
          continue;
        } else if (!this.iFColsAreEqual(e, existedCol)) {
          cols_changed = true;
        }
      }
    }

    if (
      uf != null &&
      cols_changed == false &&
      uf.version == UserPreferenceVersions.table_col_pref_version
    ) {
      this.all_columns = uf.preference_obj;
      //this.copyColumns(uf.preference_obj);
    } else {
      this.all_columns = JSON.parse(this._columnsCloneString as string);
      //this.copyColumns(this._columns);
    }
    this.setDisplayedColumns();
    this.resetSearchText();

    //this.assignColFunctions(this.all_columns, this._inputColumns);
  }

  get PDFSnapshotHeaderStyle(): string {
    return `word-wrap:break-word; white-space:normal; height: auto; line-height: 12px; font-size: 10px; width: ${this.pdfHeaderWidth}px; max-width: ${this.pdfHeaderWidth}px; max-height: 90px; overflow: hidden;`;
  }

  get PDFSnapshotFooterStyle(): string {
    return `word-wrap:break-word; white-space:normal; height: auto; line-height: 12px; font-size: 10px; width: ${this.pdfFooterWidth}px; max-width: ${this.pdfFooterWidth}px; max-height: 90px; overflow: hidden;`;
  }

  assignColFunctions(cols: MatTableColDef[], rCols: MatTableColDef[]) {
    cols.forEach((col) => {
      var _col: any = rCols.find((_c) => _c.PropertyName == col.PropertyName);
      col.footerFunc = _col.footerFunc;
      if (col.ExpandableSubColModel && col.ExpandableSubColModel.length) {
        this.assignColFunctions(
          col.ExpandableSubColModel,
          _col.ExpandableSubColModel
        );
      }
    });
  }

  copyColumns(cols: MatTableColDef[]) {
    if (this.all_columns && this.all_columns.length > 0) {
      cols.forEach((c) => {
        var ec: any = this.all_columns.find(
          (a) => a.PropertyName == c.PropertyName
        );
        if (ec != null) {
          ec.mapServiceObj(c);
        }
      });
    } else {
      this.all_columns = cols;
    }
  }

  resetSearchText() {
    this.searchText = '';
    this.dataSource.filter = '';
    this.all_columns.forEach((a) => {
      a.filterdata = [];
    });
  }

  iFColsAreEqual(col1: MatTableColDef, col2: MatTableColDef) {
    return (
      col1.PropertyName == col2.PropertyName &&
      col1.Title == col2.Title &&
      col1.SortProperty == col2.SortProperty &&
      col1.showAsHeader == col2.showAsHeader &&
      col1.isHtmlContent == col2.isHtmlContent &&
      col1.htmlContentProp == col2.htmlContentProp
    );
  }

  getUserPreferences(): UserPreference | any {
    try {
      var string_obj = localStorage.getItem(this.type);
      if (string_obj == null) {
        string_obj = CommonTableConfigBC.getInstance().getByIdentifier(
          this.type
        );
      }
      if (string_obj == null) return null;
      var actual_obj: UserPreference = JSON.parse(string_obj);
      return actual_obj;
    } catch (ex) {
      return null;
    }
  }

  setUserPreferences() {
    try {
      var uf = new UserPreference();
      uf.version = UserPreferenceVersions.table_col_pref_version;
      uf.preference_obj = this.all_columns;
      var string_obj = JSON.stringify(uf);
      localStorage.setItem(this.type, string_obj);
      // /CommonTableConfigBC.getInstance().save(this.type, string_obj);
    } catch (ex) {}
  }

  public buildData() {
    //this.tableReady = false;
    this.buildColData();
    if (this.clearSearchText) {
      this.resetSearchText();
    }
    this.enableColumnSearch = false;
    this.dataSource.data = this._data;
    this.dataSource.sort = this._sort as MatSort;
    this.originalData = this._data;
    if (this.enablePagination) {
      try {
        this.dataSource.paginator = this._paginator as MatPaginator;
        this.dataSource.paginator.firstPage();
      } catch (error) {}
    }
    this.dataSource.filterPredicate = this.strictFilter;
    this.$dataBuilt.next(true);
    this.windowResized(null);
  }

  public strictFilter(data: any, filter: string): boolean {
    console.log(data);
    data.Select = false;
    filter = filter.toLowerCase();
    let s: string = '';
    s = data.getString().toLowerCase();
    return s.includes(filter);
  }

  public buildDataWithoutAnyChange(changePage = true) {
    this.dataSource.data = this._data;
    if (this.enablePagination && changePage) {
      this.dataSource.paginator = this._paginator as MatPaginator;
      this.dataSource.paginator?.firstPage();
    }
    this.dataSource.sort = this._sort as MatSort;
    //this.dataSource.filterPredicate = this.master.standardFilter;
    this.dataSource.filterPredicate = this.strictFilter;
    this.resetSearchText();
  }

  newData(): void {
    this.create.emit(this.type);
    this.resetSearchText();
  }
  importData(): void {
    this.import.emit(this.type);
  }

  editData(data: any): void {
    this.edit.emit({ data: data, action: 'update' });
  }

  selectData(data: any): void {
    this.select.emit(data);
  }
  rowClicked(data: any, column: MatTableColDef | any = null) {
    if (this.preventViewEntityFromRowClick) return;
    this.viewData(data, column);
  }

  viewData(data: any, column: MatTableColDef | any = null): void {
    if (this.emitWithRow) {
      this.view.emit({ data: data, action: 'view' });
    } else {
      this.view.emit({ data: data, action: 'view' });
    }
  }

  showAddSchedule($event: any) {
    this.addSchedule.emit($event);
  }

  deleteData(data: any): void {
    this.delete.emit({ data: data, action: 'delete' });
  }

  downloadPdfData(data: any, column: MatTableColDef | any = null): void {
    //this.generatePdf();
    if (this.emitWithRow) {
      this.downloadPdf.emit({ data: data, column: column });
    } else {
      this.downloadPdf.emit(data);
    }
  }

  remindClicked() {
    this.matMenuTrigger?.closeMenu();
  }

  duplicateData(data: any) {
    this.duplicate.emit(data);
  }

  emailResend(data: any) {
    this.resendEmail.emit(data);
  }

  generateData(data: any) {
    this.generate.emit(data);
  }

  optionalActionData(data: any) {
    this.optionalAction.emit(data);
  }

  menuBtnClicked(data: any) {
    this.selected = data;
    this.actionMenuClicked.emit(data);
  }

  toggleStatus(data: any) {
    this.toggleActiveStatus.emit(data);
  }

  private setDisplayedColumns() {
    this.displayedColumns = [];
    if (this.showActions || this.showColumnReOrderButton) {
      this.displayedColumns.push('Action');
    }

    this.all_columns
      .filter((a) => a.IsSelected == true)
      .map((a) => a.PropertyName)
      .forEach((text) => {
        this.displayedColumns.push(text);
      });

    var len = this.displayedColumns.length;
    this.colWidth = Math.ceil(10 / len);

    this.windowResized(null);
  }

  showColEditDialog() {
    var dialogRef = this.dialog.open(EditTableColumnSelectionComponent, {
      data: this.all_columns,
    });
    dialogRef.afterClosed().subscribe((d) => {
      if (d != null) {
        this.setDisplayedColumns();
        this.buildColData();
        this.setUserPreferences();
        this.columnConfigChanged.emit(d);
      } else {
        this.buildColumns();
      }
      setTimeout(() => {
        this.removeColGrabbers();
        this.addColGrabbers();
        this.onWindowResied(null);
      }, 500);
    });
  }

  opt1Changed(data: any) {
    this.option1Changed.emit(data.target.checked);
  }

  get DateRange(): string {
    if (this.fromDate == null || this.toDate == null) return '';
    var fd = Standard.getFormattedNgbDateDisplay(this.fromDate, true);
    var td = Standard.getFormattedNgbDateDisplay(this.toDate, true);
    return fd + ' to ' + td;
    //return `${this.fromDate.day.toString().padStart(2, "0")} ${Standard.getMonthName(this.fromDate.month)} ${this.fromDate.year} to ${this.toDate.day.toString().padStart(2, "0")} ${Standard.getMonthName(this.toDate.month)} ${this.toDate.year}`;
  }
  // get loginUser(): User {
  //     return UserBC.getInstance().LoginUser;
  // }

  async downloadExcel() {
    try {
      var buffer: exceljs.Buffer | null = null;
      if (this.enableDefaultExcel == false) {
        // this.generateExcel.emit({
        //     data: this.dataSource.filteredData.slice(),
        //     columns: this.all_columns.slice(),
        // });
        // return;
        buffer = await this.getExcelBuffer({
          data: this.dataSource.filteredData.slice(),
          columns: this.all_columns.slice(),
        });
      } else {
        const workbook = new exceljs.Workbook();

        if (this.isReport) {
          const metaSheet = workbook.addWorksheet('Meta');
          const mRows = [
            ['Report Name', this.title],
            ['Date Range', this.DateRange],
            ['Report By', ''],
            ['Report On', Standard.getFormattedDateDisplay(new Date(), true)],
          ];
          // add new rows and return them as array of row objects
          metaSheet.addRows(mRows);

          var metaCol = metaSheet.getColumn(1);
          metaCol.width = 40;
          metaCol.eachCell((cell) => {
            cell.font = {
              color: { argb: 'ffffffff' },
              bold: true,
              size: 10,
            };
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'ff184381' },
            };
          });
          metaCol = metaSheet.getColumn(2);

          metaCol.eachCell((cell) => {
            cell.font = {
              size: 10,
            };
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'ffe2edff' },
            };
          });
          metaCol.width = 40;
        }

        const sheet1: any = workbook.addWorksheet(this.type);
        if (this.fromportalActivity == false) {
          sheet1.name = this.title;
        }
        let columns: any[] = [],
          rows: any[] = [];
        this.all_columns
          .filter((c) => c.IsSelected == true && !c?.hideColFromExcel)
          .forEach((col) => {
            columns.push({
              header: col.Title,
              key: col.PropertyName,
              width: 32,
            });
          });

        sheet1.columns = columns;

        var data = this.dataSource.data;
        console.log('downloading excel from common table');
        data.forEach((d) => {
          var row: any = {};
          columns.forEach((col: any) => {
            row[col.key] =
              d[col.key] && d[col.key].length > this.cellMaxChar
                ? $('<div>')
                    .append(
                      this.getText(d, col.key).substring(0, this.cellMaxChar)
                    )
                    .text()
                : $('<div>').append(this.getText(d, col.key)).text();
          });
          rows.push(row);
        });

        sheet1.addRows(rows);

        sheet1
          .getRow(1)
          .eachCell({ includeEmpty: true }, (cell: any, colNum: any) => {
            cell.font = {
              color: { argb: 'ffffffff' },
              bold: true,
              size: 10,
            };
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'ff184381' },
            };
          });

        sheet1.getRows(2, sheet1.rowCount).forEach((row: any) => {
          row.eachCell({ includeEmpty: true }, (cell: any) => {
            cell.font = {
              size: 10,
            };
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'ffe2edff' },
            };
          });
        });

        workbook.eachSheet((ws: any, id) => {
          ws.getRows(1, ws.rowCount).forEach((row: any) => {
            row.eachCell({ includeEmpty: true }, (cell: any, colNo: any) => {
              cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
              };
            });
          });
        });

        buffer = await workbook.xlsx.writeBuffer();
      }
      var fileName = this.excelFileName;
      if (fileName != null) {
        var fileName: string | null = fileName + '.xlsx';
      } else {
        fileName = `${this.type}_${Standard.nowUTC()}.xlsx`;
      }
      FileSaver.saveAs(new Blob([buffer as BlobPart]), fileName);
    } catch (e) {
      console.error('Failed to download data');
    }
  }

  /**
   * It will return the text/string of the specific property of the row if whether the propery has html content or not
   * @param data BaseEntity  type data
   * @param key PropertyName of the column
   * @returns string
   */
  getText(data: any, key: string): string {
    let column = this.all_columns.find((c) => c.PropertyName == key);
    if (column == null) return data[key];
    if (column.isHtmlContent == true) {
      return this.getHTMLString(data[column.htmlContentProp as any]);
    }
    return data[key];
  }

  async getBase64ImageFromUrl(
    imageUrl: string
  ): Promise<string | ArrayBuffer | null> {
    var res = await fetch(imageUrl);

    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          resolve(reader.result);
        },
        false
      );

      reader.onerror = () => {
        reject(null);
      };
      reader.readAsDataURL(blob);
    });
  }

  getChildContent(e: {
    data: any[];
    columns: MatTableColDef[];
    pageSize: PageSize;
  }): {
    content: ContentTable;
    tableLayout: { key: string; layout: TableLayout } | null;
  } {
    var titles: any[] = [];
    var hLineWidthIndexesc: number[] = [0, 1];
    e.columns
      .filter((a) => a.IsSelected == true)
      .map((a) => a.Title)
      .forEach((text) => {
        var tcon: ContentText = { text: text, style: { bold: true } };
        titles.push(tcon);
      });
    var data: string[][] = [];
    var columns = e.columns.filter((c) => c.IsSelected == true);
    var summarColumnIndexes: number[] = [];
    var tableWidths: Size[] = [];
    var colWidth = this.calculateColWidth(e.pageSize, columns.length);

    if (colWidth > 0) {
      columns.forEach((col) => {
        tableWidths.push(colWidth - 8);
      });
    }

    e.data.forEach((d) => {
      var row = [];
      for (var i = 0; i < columns.length; i++) {
        var col = columns[i];
        var val = d[col.PropertyName];
        if (col.isHtmlContent == true) {
          val = this.getHTMLString(d[col.htmlContentProp as any]);
        }
        if (val == undefined || val == null) {
          val = '';
        }
        row.push(val);
        if (col.ShowItemsCountInDoc) {
          summarColumnIndexes.push(i);
        }
      }
      data.push(row);
    });
    hLineWidthIndexesc.push(data.length);

    //summary

    if (summarColumnIndexes.length) {
      var row: any[] = [];
      for (var i = 0; i < columns.length; i++) {
        if (summarColumnIndexes.includes(i)) {
          var col = columns[i];
          var val = '';

          var _inputCols = this._inputColumns;
          if (this._inputColumns[0].ExpandableSubColModel != null) {
            _inputCols = this._inputColumns[0].ExpandableSubColModel;
          }
          var _col = _inputCols.find((c) => c.PropertyName == col.PropertyName);
          if (_col && _col.footerFunc != null) {
            val = _col.footerFunc(e.data);
          }
          if (val == undefined || val == null) {
            val = '';
          }
          row.push({ text: val.toString(), bold: true });
        } else {
          row.push('');
        }
      }
      data.push(row);
      hLineWidthIndexesc.push(data.length);
    }

    var body: any = [titles];
    data.forEach((d) => {
      body.push(d);
    });

    // if(tableWidths.length == 0){
    //   tableWidths = '*';
    // }
    var tabelContent: ContentTable = {
      fontSize: 8,
      layout: 'commonLayout',
      table: {
        widths: tableWidths.length > 0 ? tableWidths : '*',
        headerRows: 1,
        body: body,
      },
    };

    return { content: tabelContent, tableLayout: null };
  }

  getHTMLString(s: string) {
    if (s == null) return '';
    const options = {
      wordwrap: null,
      // ...
    };

    var text = convert(s, options);
    return text;
  }

  calculateColWidth(pz: PageSize, columns: number) {
    var eachColWidth = 0;
    if (pz == 'A4' && columns > 0) {
      eachColWidth = Math.floor((841.89 - 40) / columns);
    }
    if (pz == 'A2' && columns > 0) {
      eachColWidth = Math.floor((1683.78 - 40) / columns);
    }
    if (pz == 'A1' && columns > 0) {
      eachColWidth = Math.floor((2383.94 - 80) / columns);
    }
    return eachColWidth;
  }

  getHeaderContentWidth(pz: PageSize): number {
    var headerWidth = 0;
    if (pz == 'A4') {
      headerWidth = Math.floor((841.89 - 60) * 0.7);
    }
    if (pz == 'A2') {
      headerWidth = Math.floor((1683.78 - 60) * 0.7);
    }
    if (pz == 'A1') {
      headerWidth = Math.floor((2383.94 - 60) * 0.7);
    }
    return headerWidth;
  }

  getFooterContentWidth(pz: PageSize): number {
    var headerWidth = 0;
    if (pz == 'A4') {
      headerWidth = Math.floor(841.89 - 40);
    }
    if (pz == 'A2') {
      headerWidth = Math.floor(1683.78 - 40);
    }
    if (pz == 'A1') {
      headerWidth = Math.floor(2383.94 - 40);
    }
    return headerWidth;
  }

  getHeaderTitleWidth(pz: PageSize) {
    var headerWidth = 0;
    if (pz == 'A4') {
      headerWidth = Math.floor((841.89 - 40) * 0.3);
    }
    if (pz == 'A2') {
      headerWidth = Math.floor((1683.78 - 40) * 0.3);
    }
    if (pz == 'A1') {
      headerWidth = Math.floor((2383.94 - 40) * 0.3);
    }
    return headerWidth;
  }
  async generatePdf() {
    //ijt.pbs.setLoading(true, 'generatePDF');
    try {
      var headerLogo: any = null;
      // if (SystemParameterBC.getInstance().systemParameter.LogoId) {
      //     headerLogo = await UploadBC.getInstance().getById(
      //         SystemParameterBC.getInstance().systemParameter.LogoId
      //     );
      // }
      var footerLogo: any = null;
      // if (SystemParameterBC.getInstance().systemParameter.FooterLogoId) {
      //     footerLogo = await UploadBC.getInstance().getById(
      //         SystemParameterBC.getInstance().systemParameter.FooterLogoId
      //     );
      // }
      var headerContent = '';
      var footerContent = '';
      var isHeaderImg = false;
      var isFooterImg = false;

      var docDef: TDocumentDefinitions | null = null;
      var tableLayouts: { key: string; layout: TableLayout }[] = [];
      var hLineWidthIndexes: number[] = [0, 1];
      var pageSize = this.getPageSize();
      var skipHeader = false;
      if (this.enableDefaultPDF == false) {
        if (this.parentTable) {
          this.getPDFDoc = this.parentTable.getPDFDoc;
        }
        let result: any = await this.getPDFDoc({
          data: this.dataSource.filteredData.slice(),
          columns: this.all_columns.slice(),
        });
        if (result) {
          docDef = result.doc;
          tableLayouts = result.tableLayouts;
          skipHeader =
            result.skipHeader != undefined ? result.skipHeader : false;
        }
      } else {
        docDef = {
          pageOrientation: 'landscape',
          pageSize: 'A4',
          content: [],
        };
        var content: Content[] = [];
        var dateRangeText: string = '';
        if (
          this.isReport &&
          this.fromDate != null &&
          this.toDate != null &&
          !this.isUnbilledShipmentReport
        ) {
          var dateRangeText: string = `Dated between ${Standard.getFormattedNgbDateDisplay(
            this.fromDate,
            true
          )} and ${Standard.getFormattedNgbDateDisplay(this.toDate, true)}`;
        }

        if (Standard.getStrWithoutWhiteSpace(dateRangeText).length > 0) {
          content.push({
            marginBottom: 5,
            text: dateRangeText,
            alignment: 'right',
            fontSize: 8,
          });
        }

        var titles = [];
        var inSummaryTable = false;
        if (
          this.all_columns[0].ExpandableSubColModel &&
          this.all_columns[0].ExpandableSubColModel.length
        ) {
          inSummaryTable = true;
        }
        if (inSummaryTable) {
          this.dataSource.filteredData.forEach((d) => {
            var rowCols: any[] = [];
            var headerColumns = this.all_columns.filter((c) => c.showAsHeader);
            headerColumns.forEach((col) => {
              var _c: Column = {
                text: d[col.PropertyName],
                width: '*',
                alignment: 'left',
                fontSize: 10,
                bold: true,
                marginRight: 5,
                marginBottom: 5,
              };
              rowCols.push(_c);
            });
            if (rowCols.length > 0) {
              content.push(rowCols);
            }
            var child_all_columns = this.all_columns[0].ExpandableSubColModel;
            var string_obj = CommonTableConfigBC.getInstance().getByIdentifier(
              this.type + '_sub'
            );
            if (string_obj) {
              var actual_obj: UserPreference = JSON.parse(string_obj);
              child_all_columns = actual_obj.preference_obj;
            }

            var childT:
              | {
                  content: ContentTable;
                  tableLayout: { key: string; layout: TableLayout };
                }
              | any = this.getChildContent({
              data: d[this.all_columns[0].ExpandableDataProp as any],
              columns: child_all_columns as any,
              pageSize: pageSize,
            });
            if (childT.tableLayout) {
              tableLayouts.push(childT.tableLayout);
            }
            var _childcontent = childT.content;
            _childcontent.marginBottom = 10;
            content.push(_childcontent);
          });
        } else {
          var childT:
            | {
                content: ContentTable;
                tableLayout: { key: string; layout: TableLayout };
              }
            | any = this.getChildContent({
            data: this.dataSource.filteredData,
            columns: this.all_columns,
            pageSize: pageSize,
          });
          if (childT.tableLayout) {
            tableLayouts.push(childT.tableLayout);
          }
          var _childcontent = childT.content;
          content.push(_childcontent);
        }
        docDef.content = content;
      }

      if (!docDef) {
        throw new Error('Doc is not defined!');
      }

      //#region  header & footer
      //header column
      var headerCol: Column | null = null;
      var headerMargin: number = 45; // max 120
      var _imgData: any = null;
      this.pdfHeaderWidth = this.getHeaderContentWidth(pageSize);
      this.pdfFooterWidth = this.getFooterContentWidth(pageSize);

      if (isHeaderImg) {
        if (headerLogo && headerLogo.ServerFilePath.length > 0) {
          _imgData = <string>(
            await this.getBase64ImageFromUrl(headerLogo.ServerFilePath)
          );
          if (_imgData) {
            headerCol = {
              margin: [20, 20, 0, 0],
              image: _imgData,
              fit: [this.pdfHeaderWidth, 90],
            };
            headerMargin = 130;
          }
        }
      } else if (headerContent != null && headerContent.length > 0) {
        this.headerHtmlContent =
          this.sanitizer.bypassSecurityTrustHtml(headerContent);
        var r: any = await this.getHeaderOrFooterContentAsImg();
        _imgData = r.img;
        headerMargin = r.height + 20;
        this.headerHtmlContent = null;
        if (_imgData) {
          headerCol = {
            margin: [20, 20, 0, 0],
            image: _imgData,
            fit: [this.pdfHeaderWidth, 90],
          };
        }
      }

      if (headerMargin < 40) {
        headerMargin = 50;
      }
      if (headerMargin > 130) {
        headerMargin = 130;
      }

      //footer column
      var footerMargin = 50;
      var footerCol: Column = {
        margin: [40, 100, 40, 0],
        width: '*',
        text: '',
        fontSize: 8,
        bold: false,
      };
      var footerFound = false;
      if (isFooterImg) {
        if (footerLogo && footerLogo.ServerFilePath.length > 0) {
          _imgData = <string>(
            await this.getBase64ImageFromUrl(footerLogo.ServerFilePath)
          );
          if (_imgData) {
            footerCol = {
              margin: [20, 10, 20, 0],
              image: _imgData,
              height: 90,
              width: this.pdfFooterWidth,
              fit: [this.pdfFooterWidth, 90],
            };
            footerFound = true;
            footerMargin = 150;
          }
        }
      } else if (footerContent != null && footerContent.length > 0) {
        this.footerHtmlContent =
          this.sanitizer.bypassSecurityTrustHtml(footerContent);
        console.log(this.pdfFooterWidth);
        var r: any = await this.getHeaderOrFooterContentAsImg();
        _imgData = r.img;
        this.footerHtmlContent = null;
        if (_imgData) {
          footerCol = {
            margin: [20, 10, 20, 0],
            image: _imgData,
            height: 90,
            width: this.pdfFooterWidth,
            fit: [this.pdfFooterWidth, 90],
          };
          footerFound = true;
          footerMargin = r.height + 60;
          console.log('r.height:', r.height);
        }
      }

      if (footerMargin < 50) {
        footerMargin = 50;
      }
      if (footerMargin > 150) {
        footerMargin = 150;
      }

      var headerColumns = [];
      if (headerCol) {
        headerColumns.push(headerCol);
      }

      var headerTitleWidth = this.getHeaderTitleWidth(pageSize);

      headerColumns.push({
        margin: [20, 20, 20, 0],
        width: headerCol ? headerTitleWidth : '*',
        text: this.title,
        alignment: headerCol ? 'right' : 'center',
        fontSize: 14,
        bold: true,
      });
      //#endregion

      docDef.pageMargins = [20, 20, 20, footerMargin];
      if (!skipHeader) {
        docDef.pageMargins = [20, headerMargin, 20, footerMargin];
        docDef.header = [
          {
            columns: headerColumns,
          },
        ] as any;
      }

      //docDef.pageOrientation = 'landscape';
      docDef.pageSize = pageSize;
      docDef.defaultStyle = {
        fontSize: 8,
        margin: [20, 20, 20, 0],
      };
      var printedOnText = `Printed on ${Standard.getFormattedDateDisplay(
        new Date()
      )} by -}`;
      docDef.footer = function (currentPage, pageCount): any[] {
        return [
          footerFound ? footerCol : { text: '' },
          {
            fontSize: 8,
            margin: [20, footerFound ? 5 : 10, 20, 20],
            layout: 'footerTableLayout',
            table: {
              widths: '*',
              body: [
                [
                  { text: printedOnText, italics: true },
                  {
                    text: `page ${currentPage} of ${pageCount}`,
                    alignment: 'right',
                    italics: true,
                  },
                ],
              ],
            },
          },
        ];
      };

      // var ctl: CustomTableLayout = {
      //     hLineWidth: function (rowIndex: number, node: ContentTable) {
      //         if (rowIndex == 0 || rowIndex == 1) return 1;
      //         return 0;
      //     },
      //     vLineWidth: () => 0,
      //     fillColor: function (rowIndex: number, node: ContentTable, columnIndex: number) {
      //         if (rowIndex > 0 && rowIndex % 2 == 0) {
      //             return '#F5F5F5';
      //         }
      //         return 'white';
      //     },
      // };
      var ctl: CustomTableLayout = {
        hLineWidth: function (rowIndex: number, node: ContentTable) {
          if (hLineWidthIndexes.includes(rowIndex)) return 1;
          //if(rowIndex == 0 || rowIndex == 1) return 1;
          return 0;
        },
        vLineWidth: () => 0,
        fillColor: function (
          rowIndex: number,
          node: ContentTable,
          columnIndex: number
        ) {
          if (rowIndex > 0 && rowIndex % 2 == 0) {
            return '#F5F5F5';
          }
          return 'white';
        },
      };

      var ftbl: CustomTableLayout = {
        hLineWidth: function (rowIndex: number, node: ContentTable) {
          if (rowIndex == 0) return 1;
          return 0;
        },
        vLineWidth: () => 0,
        hLineColor: function (i) {
          return i === 0 ? 'gray' : 'transparent';
        },
      };

      var tableLayoutsObj: any = {};
      tableLayoutsObj['commonLayout'] = ctl;
      tableLayoutsObj['footerTableLayout'] = ftbl;

      if (tableLayouts && tableLayouts.length > 0) {
        tableLayouts.forEach((item) => {
          tableLayoutsObj[item.key] = item.layout;
        });
      }
      pdfMake
        .createPdf(docDef, tableLayoutsObj, PdfMakerService.getInstance().fonts)
        .download(this.title);
    } catch (ex) {
      console.error(ex);
      //ijt.notificationService.error(ex);
    }
    //ijt.pbs.setLoading(false, 'generatePDF');
  }

  getPageSize(): PageSize {
    var pz: PageSize = 'A4';
    var len = this.all_columns.filter((c) => c.IsSelected).length;

    if (
      this.all_columns[0].ExpandableSubColModel != null &&
      this.all_columns[0].ExpandableSubColModel.length > 0
    ) {
      var stringObj = CommonTableConfigBC.getInstance().getByIdentifier(
        this.type + '_sub'
      );
      if (stringObj) {
        var uf: UserPreference = JSON.parse(stringObj);
        var nestedTableColumns: MatTableColDef[] = uf.preference_obj;
        if (nestedTableColumns.filter((c) => c.IsSelected).length > len) {
          len = nestedTableColumns.filter((c) => c.IsSelected).length;
        }
      } else if (
        this.all_columns[0].ExpandableSubColModel.filter(
          (a: any) => a.IsSelected
        ).length > len
      ) {
        len = this.all_columns[0].ExpandableSubColModel.filter(
          (a: any) => a.IsSelected
        ).length;
      }
    }
    if (len > 9) {
      pz = 'A2';
    }
    if (len > 17) {
      pz = 'A1';
    }

    return pz;
  }

  async getHeaderOrFooterContentAsImg(): Promise<{
    img: string;
    height: number;
  } | null> {
    var _p = new Promise<{ img: string; height: number } | null>((res, rej) => {
      setTimeout(() => {
        try {
          var _h: number = 0;
          var node: HTMLElement = <HTMLElement>(
            document.getElementById(this.printSectionId)
          );
          if (node) {
            var innerChild = node;
            _h = +$(innerChild)
              .prop('scrollHeight')
              ?.toString()
              .replace('px', '');
          }
          htmlToImage.toPng(node, { pixelRatio: 5 }).then(function (dataUrl) {
            res({ img: dataUrl, height: _h });
          });
        } catch (ex) {
          res(null);
        }
      }, 100);
    });
    return _p;
  }

  // I must need data read
  public buildColData(): void {
    this.all_columns.forEach((alCal: any) => {
      alCal.enableColumnSearch = false;
      var colData: any[] = [];
      if (alCal.ColFilterDataSource == null) {
        colData = map(this._data, alCal.PropertyName).filter((a) => {
          if (a != null) {
            return a;
          }
        });
      } else {
        this._data.forEach((d) => {
          var val: any = d[alCal.ColFilterDataSource as any];
          if (typeof val == 'object') {
            colData.push(...val);
          } else {
            colData.push(val);
          }
        });
      }

      var data: any[] = colData;
      data = sortBy(uniq(colData));
      try {
        if (data && data.length) {
          if (
            !/^\d+$/.test(data[0]) &&
            !isNaN(new Date(this.sanitizeDateForFilter(data[0])).getDate())
          ) {
            data = sortBy(data, (dateObj) => {
              return new Date(this.sanitizeDateForFilter(dateObj));
            });
            data = data.reverse();
          }
        }
      } catch (error) {
        // above flow does not affect normal flow
        console.error(error);
      }
      alCal.colFilterData = data;
    });
  }

  // adjust dateformats of system to javascript readable formats
  // test function when new date format added in system
  private sanitizeDateForFilter(dateString: string): string {
    try {
      var date: string = dateString;
      date = date.replace(' at', '');
      date = date.replace(' AM ', '');
      date = date.replace(' PM ', '');
      date = date.replace(' AM', '');
      date = date.replace(' PM', '');
      if (date.includes('day,')) {
        // Saturday, June 15, 2019 at 10:54:25 PM GMT+05:30
        date = date.substring(date.indexOf(',') + 1);
      }
      if (date.includes('GMT')) {
        date = date.substring(0, date.indexOf('GMT'));
      }
      date = date.replace(',', '');
      date = date.trim();
      if (date && date.length > 1 && date.split('/').length == 3) {
        let dateArr = date.split('/');
        date = `${dateArr[1]}/${dateArr[0]}/${dateArr[2]}`;
      }
    } catch (error) {
      return dateString;
    }
    return date;
  }

  onChange(column: MatTableColDef) {
    var ec: any = this.all_columns.find((a) => a.Title == column.Title);
    ec.filterdata = column.filterdata;

    let _data = this._data.slice();
    this.all_columns.forEach((alCal: any) => {
      if (alCal.filterdata && alCal.filterdata.length) {
        _data = _data.filter(
          (d) =>
            alCal.filterdata.includes(d[alCal.PropertyName]) ||
            (alCal.ColFilterDataSource != null &&
              intersection(d[alCal.ColFilterDataSource], alCal.filterdata)
                .length > 0)
        );
      }
    });

    this.dataSource.data = _data;
    this.all_columns.forEach((alCal) => {
      let colData: any[] = [];

      if (alCal.ColFilterDataSource == null) {
        colData = map(_data, alCal.PropertyName).filter((a) => {
          if (a != null) {
            return a;
          }
        });
      } else {
        this._data.forEach((d) => {
          var val: any = d[alCal.ColFilterDataSource as any];
          if (typeof val == 'object') {
            colData.push(...val);
          } else {
            colData.push(val);
          }
        });
      }

      var data = sortBy(uniq(colData));

      if (
        alCal.Title != column.Title ||
        (alCal.Title == column.Title && !column.filterdata?.length)
      ) {
        alCal.colFilterData = data;
      }
    });
  }

  toggleClose(column: MatTableColDef): void {
    var ec: any = this.all_columns.find(
      (a) => a.PropertyName == column.PropertyName
    );
    ec.enableColumnSearch = !ec.enableColumnSearch;
    column.enableColumnSearch = ec.enableColumnSearch;
    if (!ec.enableColumnSearch) {
      ec.filterdata = [];
      this.onChange(ec);
    }
  }

  mouseOver(event_data: any) {
    $(this.t_id).addClass('show-scrollbar');
  }

  mouseLeave(event_data: any) {
    $(this.t_id).removeClass('show-scrollbar');
  }

  get getCols(): MatTableColDef[] {
    return this.all_columns;
  }

  getCol(propName: any): MatTableColDef | any {
    return this.all_columns.find((a) => a.PropertyName == propName);
  }

  footerCountForPriceReport(allData: any[], propertyName: string) {
    const skip = this._paginator.pageSize * this._paginator.pageIndex;
    const data = allData
      .filter((u, i) => i >= skip)
      .filter((u, i) => i < this._paginator.pageSize);

    switch (propertyName) {
      case 'BranchName':
        return 'Total';
      case 'SearchCount':
        return data
          .map((x) => x.SearchCount)
          .reduce((partialSum, a) => partialSum + a, 0);
      case 'InquiryCount':
        return data
          .map((x) => x.InquiryCount)
          .reduce((partialSum, a) => partialSum + a, 0);
      case 'QuotationCount':
        return data
          .map((x) => x.QuotationCount)
          .reduce((partialSum, a) => partialSum + a, 0);
      case 'BookingsCount':
        return data
          .map((x) => x.BookingsCount)
          .reduce((partialSum, a) => partialSum + a, 0);
      case 'UsersCount':
        return data
          .map((x) => x.UsersCount)
          .reduce((partialSum, a) => partialSum + a, 0);
      case 'RateFilesProcessedCount':
        return data
          .map((x) => x.RateFilesProcessedCount)
          .reduce((partialSum, a) => partialSum + a, 0);
      case 'UsedCustomerPortalUsersCount':
        return data
          .map((x) => x.UsedCustomerPortalUsersCount)
          .reduce((partialSum, a) => partialSum + a, 0);
      case 'ConfirmQuotationAPIUsageCount':
        return data
          .map((x) => x.ConfirmQuotationAPIUsageCount)
          .reduce((partialSum, a) => partialSum + a, 0);
      case 'PortalCustomersCount':
        return data
          .map((x) => x.PortalCustomersCount)
          .reduce((partialSum, a) => partialSum + a, 0);
      case 'InquiriesAPIUsageCount':
        return data
          .map((x) => x.InquiriesAPIUsageCount)
          .reduce((partialSum, a) => partialSum + a, 0);
      case 'InquiriesManualUsageCount':
        return data
          .map((x) => x.InquiriesManualUsageCount)
          .reduce((partialSum, a) => partialSum + a, 0);
      case 'InquiriesPortalUsageCount':
        return data
          .map((x) => x.InquiriesPortalUsageCount)
          .reduce((partialSum, a) => partialSum + a, 0);
      default:
        return '';
    }
  }

  // generatePDF(e: any) {

  //     this.downloadPdf.emit(e);
  // }
  // generateExcelSheet(e: any) {
  //     this.generateExcel.emit(e);
  // }
  async remind() {}
  public applyFilter(dataSource: any, filterTarget: any) {
    // console.log('applyFilter called')
    // console.log('dataSource:', dataSource)
    // console.log('filterValue:', filterValue)
    let filterValue = filterTarget.value;
    if (filterValue != null) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      dataSource.filter = filterValue;
    }
  }
}
