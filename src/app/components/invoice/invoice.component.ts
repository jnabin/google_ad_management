import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { InvoiceService } from '../../services/invoice.service';
import { InvoicePlaceholderValuesDto } from '../../models/invoice-placeholder-values-dto';

export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  tax: number;
  discount: number;
}

@Component({
  selector: 'app-invoice',
  imports: [FormsModule, CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InvoiceComponent{
  logoUrl: string | null = null;
  invoiceDate = new Date().toISOString().split('T')[0];
  dueDate = new Date().toISOString().split('T')[0];
  items: WritableSignal<InvoiceItem[]> = signal([{ description: '', quantity: 1, price: 0, discount: 0, tax: 0 }]);
  total = signal(0);
  subTotal = signal(0);
  tax = signal(0);
  discount = signal(0);
  errorMessage = signal<string | null>(null);
  removeElements = signal(false);
  invoiceService: InvoiceService = inject(InvoiceService);
  invoiceData = signal<InvoicePlaceholderValuesDto | null>(null);

  constructor() {
    this.loadInvoiceData();
  }

  private loadInvoiceData(){
    this.invoiceService.getInvoiceData().subscribe({
      next: (data) => {
        if('error' in data){
          this.errorMessage.set(data.error)
          this.invoiceData.set(null);
        } else {
          this.invoiceData.set(data);
          this.errorMessage.set(null);

          console.log(this.invoiceData());
          console.log(this.errorMessage());
        }
      },
      error: (err) => {
        this.errorMessage.set(err.message);
        this.invoiceData.set(null);
      }
    });
  }

  onLogoUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  addItem() {
    this.items.update((items: any) => [...items, { description: '', quantity: 1, price: 0, tax: 0 }]);
    this.updateTotal();
  }

  removeItem(index: number) {
    this.items.update(items => items.filter((_, i) => i !== index));
    this.updateTotal();
  }

  calculateItemTotal(item: InvoiceItem): number {
    let amount = this.calculateItemSubTotal(item);
    return (amount - this.calculateItemDiscount(item) ) * (1 + item.tax / 100);
  }

  calculateItemSubTotal(item: InvoiceItem): number {
    return item.quantity * item.price;
  }
  calculateItemTax(item: InvoiceItem): number {
    return item.tax * 0.01 * this.calculateItemSubTotal(item);
  }
  calculateItemDiscount(item: InvoiceItem): number {
    return item.discount * 0.01 * this.calculateItemSubTotal(item);
  }

  updateTotal() {
    this.total.set(this.items().reduce((sum, item) => sum + this.calculateItemTotal(item), 0));
    this.updateSubTotal();
    this.updateDiscount();
    this.updateTax();
  }

  updateSubTotal() {
    this.subTotal.set(this.items().reduce((sum, item) => sum + this.calculateItemSubTotal(item), 0));
  }
  updateDiscount() {
    this.discount.set(this.items().reduce((sum, item) => sum + this.calculateItemDiscount(item), 0));
  }
  updateTax() {
    this.tax.set(this.items().reduce((sum, item) => sum + this.calculateItemTax(item), 0));
  }

  downloadInvoice() {
    this.removeElements.set(true);
    const invoiceElement = document.querySelector('.invoice-container');
    const buttons = document.querySelectorAll('.no-print');

    // Hide buttons before generating PDF
    buttons.forEach(button => (button as HTMLElement).style.display = 'none');

    if (invoiceElement) {
      // html2canvas(invoiceElement as any).then(canvas => {
      //   const imgData = canvas.toDataURL('image/png');
      //   const pdf = new jsPDF();
      //   const imgWidth = 190; // Adjust width for PDF layout
      //   const imgHeight = (canvas.height * imgWidth) / canvas.width;
      //   pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      //   pdf.save('invoice.pdf');
      // });
      html2canvas(invoiceElement as any, { scale: 2, logging: false, useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg', 0.7); // Use JPEG format with compression
        const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);
        pdf.save('invoice.pdf');
         // Restore buttons after PDF generation
         buttons.forEach(button => (button as HTMLElement).style.display = '');
      });
      
    }
  }
}