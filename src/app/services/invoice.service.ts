import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { InvoicePlaceholderValuesDto } from '../models/invoice-placeholder-values-dto';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BaseService {
  private jsonUrl = 'assets/invoice-placeholder-values.json';
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getInvoiceData(): Observable<InvoicePlaceholderValuesDto | {error : string}> {
    return this.http.get<InvoicePlaceholderValuesDto>(this.jsonUrl).pipe(
      catchError(this.handleError<InvoicePlaceholderValuesDto>('getInvoiceData'))
    );
  }

}
