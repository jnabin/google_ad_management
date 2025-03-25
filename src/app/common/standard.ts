import { DatePipe } from "@angular/common";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
export class NgbDateTimeStruct {
    year!: number;
    month!: number;
    day!: number;
    hours: number = 0;
    mins: number = 0;
    seconds: number = 0;
}
export class Standard{
    public static getFormattedDateDisplay(d: Date, onlyDate: boolean = false): string {
        if (d == null) return '';
        return d.toLocaleDateString();
    }

    public static getFormattedNgbDateDisplay(ngd: NgbDateStruct, onlyDate: boolean = false): string {
        if (ngd == null) return '';
        var d = Standard.getDateFromNgbDate(ngd);
        return Standard.getDateTimeStringFormat(d, onlyDate);
    }

    public static getStandardDateFormat(date: Date): string |any {
        let dp: DatePipe = new DatePipe('en-US');
        //return dp.transform(date, 'EEE, MMM d');
        return dp.transform(date, 'medium');
    }

    public static getDateFromNgbDate(ngb: NgbDateStruct): Date | any {
        if (ngb == undefined) {
            return undefined;
        }
        return new Date(ngb.year, ngb.month - 1, ngb.day);
    }

    public static getDateTimeStringFormat(d: Date, onlyDate: boolean = false): string {
        if (d == null) return '';
  
        var ngb: NgbDateTimeStruct | null = null;
        var date: Date | null = null;
        date = d;
        ngb = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hours: date.getHours(),
            mins: date.getMinutes(),
            seconds: date.getSeconds(),
        };
  
        return Standard.getStandardDateFormat(d);
    }

    public static getStrWithoutWhiteSpace(str: string | undefined | null) {
        if (str == undefined || str == null) {
            return '';
        }
        if (typeof str != 'string') {
            str = (<any>str).toString();
        }
        return str?.trim() as string;
    }

    public static nowUTC(): number {
        let now: Date = new Date();
        let m: number = now.getTime() + now.getTimezoneOffset() * 60000;
        return m;
    }

    public static getMonthName(m: number): string {
        var name: string = '';
        switch (m) {
            case 1: {
                name = 'January';
                break;
            }
            case 2: {
                name = 'February';
                break;
            }
            case 3: {
                name = 'March';
                break;
            }
            case 4: {
                name = 'April';
                break;
            }
            case 5: {
                name = 'May';
                break;
            }
            case 6: {
                name = 'June';
                break;
            }
            case 7: {
                name = 'July';
                break;
            }
            case 8: {
                name = 'August';
                break;
            }
            case 9: {
                name = 'September';
                break;
            }
            case 10: {
                name = 'October';
                break;
            }
            case 11: {
                name = 'November';
                break;
            }
            case 12: {
                name = 'December';
                break;
            }
        }
        return name;
    }
}
