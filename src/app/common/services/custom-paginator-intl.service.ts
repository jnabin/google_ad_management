import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class CustomPaginatorIntl extends MatPaginatorIntl {
  override getRangeLabel = () => '';  // 👈 This hides the range label
}
