import { DatePipe } from "@angular/common";
import { NgbDateTimeStruct } from "../common/standard";
import { Guid } from "./guid";
import moment from "moment";

export abstract class BaseEntity<T extends BaseEntity<T>> {
    static EDIT_MODE: string = 'EDIT_MODE';
    static CLONE_MODE: string = 'CLONE_MODE';
    static VIEW_MODE: string = 'VIEW_MODE';
    static NEW_MODE: string = 'NEW_MODE';
    static PROCESS_MODE: string = 'PROCESS_MODE';
    static DELETE_MODE: string = 'DELETE_MODE';
    static VOID_MODE: string = 'VOID_MODE';
    public fk?: keyof T;
    public mode?: string;
    public ObjectType!: string;
    public createdDateDisplay!: string;

    /**
     * Phantom entity will be ignored by track changes process
     */
    public isPhantom: boolean = false;

    /**
     * Entity not reachable by UI actions in an editing session will be ignored by track changes process
     */
    public UI_Visited: boolean = false;

    public Id: number = 0;
    public GUID: string;
    public LongId: number = 0;
    public Name?: string;
    public NetworkId?: number;
    public OriginalCompanyId?: number;
    public HI: number = 0;
    public IsPendingEntity: boolean = false;
    public OverridePreviousPendingEntityId: number = 0;

    // always in UTC format. You have to convert to local time to display time in UI.
    public CreatedDate?: NgbDateTimeStruct;
    public ModifiedDate?: NgbDateTimeStruct;

    public CreatedBy!: number;
    public ModifiedBy!: number;
    public IsDeleted?: boolean = false;
    public Error?: string;
    public DbLoaded: boolean = false;
    public Select: boolean = false;
    public selected: boolean = false;
    public indeterminate: boolean = false;
    public Submitted: boolean = false;
    public FullRealized: boolean = false;
    public _createdByUserName: string = '';
    //utc date time
    public CreatedDateUTC: number;
    public ModifiedDateUTC: number;
    public UnChanged: boolean = false;
    private beginCheckDirty: boolean = false;
    public BlockedRuleApproval: boolean = false;
    public LocalName?: string;
    public IsSeed: boolean = false;
    _recentlyChanged: boolean = false;




    /**
     * Get global or local name
     */
    public get ResolvedName(): string | any {
        if (this.LocalName == null || this.LocalName.length == 0 || this.LocalName.trim().length == 0) return this.Name;
        return this.LocalName;
    }


    public ResolveDateTime() {
        try {
            // moment not initialized sometimes, so delayed
            if (this.CreatedDate == null) {
                this.CreatedDateUTC = 0;
            }
            else {
                var mm = moment()
                    .clone()
                    .utc()
                    .year(this.CreatedDate.year)
                    .month(this.CreatedDate.month - 1)
                    .date(this.CreatedDate.day)
                    .hour(this.CreatedDate.hours)
                    .minute(this.CreatedDate.mins)
                    .second(0);

                this.CreatedDateUTC = mm.valueOf();
            }
            if (this.ModifiedDate == null) {
                this.ModifiedDateUTC = 0;
            }
            else {
                mm = moment()
                    .clone()
                    .utc()
                    .year(this.ModifiedDate.year)
                    .month(this.ModifiedDate.month - 1)
                    .date(this.ModifiedDate.day)
                    .hour(this.ModifiedDate.hours)
                    .minute(this.ModifiedDate.mins)
                    .second(0);
                this.ModifiedDateUTC = mm.valueOf();
            }
        } catch (error) {

        }
    }

    constructor(fk?: keyof T) {
        if (fk) this.fk = fk;
        var d = new Date();
        this.mode = BaseEntity.NEW_MODE;
        this.CreatedDate = this.nowNgbDateTimeUTC();
        this.ModifiedDate = this.nowNgbDateTimeUTC();
        this.GUID = Guid.newGuid();
        this.CreatedDateUTC = d.getTime();
        this.ModifiedDateUTC = d.getTime();

    }

    private nowNgbDateTimeUTC(): NgbDateTimeStruct {
        let now: Date = new Date();
        return {
            year: now.getUTCFullYear(),
            month: now.getUTCMonth() + 1,
            day: now.getUTCDate(),
            hours: now.getUTCHours(),
            mins: now.getUTCMinutes(),
            seconds: now.getUTCSeconds(),
        };
    }

    public ignoredRuleFields(): (keyof T)[] {
        return [];
    }

    public belongToScreens(): string[] {
        return []; //['all'];
    }


    /**
     * Shallow compare this entity with another.
     * @param t The compared entity.
     * @returns Change array of fields returned by getCombinedFields method.
     */
    private changed(oldV: any, newV: any): boolean {
        if (this.blank(oldV) && this.blank(newV)) return false;
        return oldV != newV;
    }

    private blank(v: any): boolean {
        return v == null || v == '' || (v instanceof Array && v.length == 0);
    }

    /**
     * The class name of this entity. For ex: 'Company'
     *
     * Note: DO NOT return obj.constructor.name here. As it can only run in debug mode. In release, all class names obfuscated to A,B,C,D etc
     */
    public abstract className?(): string;

    public get Debug(): string {
        return JSON.stringify(this);
    }

    public getString(): string {
        return '';
    }

    public get CreatedDateString(): string {
        return this.getDateString(this.CreatedDate as any); 
    }
    public get ModifiedDateString(): string {
        return this.getDateString(this.ModifiedDate as any);
    }

    get CreatedDateDisplay(): string {
        return ''; //anph: tempo comment method causing class dependency looping
        // if (this.CreatedDate == null) return '';
        // return Standard.getDateTimeStringFormat(Standard.GetDateObjFromUtcNgbDateTime(this.CreatedDate));
    }

    public getDateString(ds: NgbDateTimeStruct): string | any {
        let date: Date = new Date();
        if (ds) {
            date = new Date(ds.year, Number(ds.month) - Number(1), ds.day, ds.hours, ds.mins);
        }
        // return Standard.getFormattedDateDisplay(date);
        let dp: DatePipe = new DatePipe('en-US');
        return dp.transform(date, 'MM/dd/yyyy');
    }

    public static get base_keys(): string[] {
        var returnKeys = Object.keys(BaseEntity).map((key) => key);
        // returnKeys.push('CreatedDateUTC2');
        // returnKeys.push('ModifiedDateUTC2');
        returnKeys.push('CreatedDate');
        returnKeys.push('ModifiedDate');
        returnKeys.push('logo');
        returnKeys.push('CreatedBy');
        returnKeys.push('ModifiedBy');
        return returnKeys;
    }

    public abstract newEntity?(): T;

    /**
     * BaseBC will call convert method for each entity from serverless get flow
     */
    public convert() { }

    /**
     * BaseBC will call revert method for each entity in serverless save flow
     */


    /**
     * Marks pristine true
     *
     * Marks dirty false
     *
     * Recursively to this entity and its children
     * @returns
     */


    public get isEdit(): boolean {
        return this.mode == BaseEntity.EDIT_MODE;
    }
    public get isNew(): boolean {
        return this.mode == BaseEntity.NEW_MODE;
    }
    public get isView(): boolean {
        return this.mode == BaseEntity.VIEW_MODE;
    }
    public get isClone(): boolean {
        return this.mode == BaseEntity.CLONE_MODE;
    }
}