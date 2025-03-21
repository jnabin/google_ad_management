import { CommonModule } from '@angular/common';
import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileUploadInputComponent } from '../../../common/components/file-upload-input/file-upload-input.component';
import { AGENCY_FORM_DATA, SAVE_FORM } from '../agency-profile.component';
import { AgencyFormWrapperDto } from '../../../models/agency-profile';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-invoice-info',
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatButtonModule,
    FileUploadInputComponent,
    MatCheckboxModule,
    FormsModule
  ],
  templateUrl: './invoice-info.component.html',
  styleUrl: './invoice-info.component.css'
})
export class InvoiceInfoComponent implements OnInit{
  agencyFormData: WritableSignal<AgencyFormWrapperDto> = inject(AGENCY_FORM_DATA);
  saveForm = inject<() => void>(SAVE_FORM);
  invoiceForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    effect(() => {
      const updatedData = this.agencyFormData().AgencyInvoiceSettingsData;
      this.invoiceForm.patchValue(updatedData, { emitEvent: false });
    });
  }
  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      AgencyInvoiceName: [this.agencyFormData().AgencyInvoiceSettingsData.AgencyInvoiceName, Validators.required],
      AgencyInvoiceEmail: [this.agencyFormData().AgencyInvoiceSettingsData.AgencyInvoiceEmail, [Validators.required, Validators.email]],
      AgencyInvoiceAddress: [this.agencyFormData().AgencyInvoiceSettingsData.AgencyInvoiceAddress, Validators.required],
      AgencyInvoiceContactNo: [this.agencyFormData().AgencyInvoiceSettingsData.AgencyInvoiceContactNo, [Validators.required, Validators.pattern('^[0-9]+$')]],
      AgencyInvoiceWebsite: [this.agencyFormData().AgencyInvoiceSettingsData.AgencyInvoiceWebsite, Validators.required],
      AgencyInvoiceLogoInByte: [this.agencyFormData().AgencyInvoiceSettingsData.AgencyInvoiceLogoInByte],
      IsSameAsAgency: [this.agencyFormData().AgencyInvoiceSettingsData.IsSameAsAgency],
      AgencyInvoiceLogo: [null]
    });

    this.invoiceForm.valueChanges.subscribe((values) => {
      const prevData = this.agencyFormData();
      this.agencyFormData.set({
        ...prevData,
        AgencyInvoiceSettingsData: { ...prevData.AgencyInvoiceSettingsData, ...values }
      });
    });
  }

  get isSameAsAgency(): boolean {
    return false;
  }

  copyAgencyInfoIntoInvoice(val: MatCheckboxChange) {
    if(val.checked){
      this.invoiceForm.setValue({
        AgencyInvoiceName: this.agencyFormData().AgencyFormData.AgencyName,
        AgencyInvoiceEmail: this.agencyFormData().AgencyFormData.AgencyEmail,
        AgencyInvoiceAddress: this.agencyFormData().AgencyFormData.AgencyAddress,
        AgencyInvoiceContactNo: this.agencyFormData().AgencyFormData.AgencyContactNo,
        AgencyInvoiceWebsite: this.agencyFormData().AgencyFormData.AgencyWebsite,
        AgencyInvoiceLogoInByte: this.agencyFormData().AgencyFormData.AgencyLogoInByte,
        IsSameAsAgency: true,
        AgencyInvoiceLogo: [null],
      })
    };
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.invoiceForm.patchValue({ invoiceLogo: input.files[0] });
    }
  }

  resetForm(): void {
    this.invoiceForm.reset();
  }

  saveChanges(): void {
    if (this.invoiceForm.valid) {
      const formData = new FormData();
      formData.append('invoiceAgencyName', this.invoiceForm.value.invoiceAgencyName);
      formData.append('invoiceEmail', this.invoiceForm.value.invoiceEmail);
      formData.append('invoiceAddress', this.invoiceForm.value.invoiceAddress);
      formData.append('invoiceContactNumber', this.invoiceForm.value.invoiceContactNumber);
      formData.append('invoiceWebsite', this.invoiceForm.value.invoiceWebsite);

      if (this.invoiceForm.value.invoiceLogo) {
        formData.append('invoiceLogo', this.invoiceForm.value.invoiceLogo, this.invoiceForm.value.invoiceLogo.name);
      }

      // this.http.post('/api/invoice-info', formData).subscribe(response => {
      //   console.log('Invoice Information Saved:', response);
      // });
    }
  }

  convertFileToBase64(file: any, field: 'AgencyInvoiceLogoInByte'): void {
    debugger;
    if(!file){
      this.invoiceForm.patchValue({ [field]: '' });
      const prevData = this.agencyFormData();
      this.agencyFormData.set({
        ...prevData,
        AgencyInvoiceSettingsData: {
          ...prevData.AgencyInvoiceSettingsData,
          AgencyInvoiceLogoInByte: ''
        }
      });
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;

      // ✅ Update Form Control
      this.invoiceForm.patchValue({ [field]: base64String });

      // ✅ Update Signal
      const prevData = this.agencyFormData();
      this.agencyFormData.set({
        ...prevData,
        AgencyInvoiceSettingsData: {
          ...prevData.AgencyInvoiceSettingsData,
          AgencyInvoiceLogoInByte: base64String
        }
      });
    };
  }
}
