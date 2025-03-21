import { Component, effect, inject, OnInit, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ColorPickerComponent } from '../../../common/components/color-picker/color-picker.component';
import { FileUploadInputComponent } from '../../../common/components/file-upload-input/file-upload-input.component';
import { AgencyFormWrapperDto } from '../../../models/agency-profile';
import { AGENCY_FORM_DATA, SAVE_FORM } from '../agency-profile.component';

@Component({
  selector: 'app-branding-preferences',
  imports: [
    ReactiveFormsModule, 
    MatButtonModule, 
    ColorPickerComponent,
    FileUploadInputComponent
  ],
  templateUrl: './branding-preferences.component.html',
  styleUrl: './branding-preferences.component.css'
})
export class BrandingPreferencesComponent implements OnInit{
  agencyFormData: WritableSignal<AgencyFormWrapperDto> = inject(AGENCY_FORM_DATA);
  saveForm = inject<() => void>(SAVE_FORM);
  brandingForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    effect(() => {
      const updatedData = this.agencyFormData().AgencyFormData;
      this.brandingForm.patchValue(updatedData, { emitEvent: false });
    });
  }

  ngOnInit(): void {
    this.brandingForm = this.fb.group({
      AgencyPrimaryColorCode: [this.agencyFormData().AgencyFormData.AgencyPrimaryColorCode, Validators.required],
      AgencyFontColorCode: [this.agencyFormData().AgencyFormData.AgencyFontColorCode, Validators.required],
      agencyLogo: [null, Validators.required],
      favicon: [null],
      AgencyLogoInByte: [this.agencyFormData().AgencyFormData.AgencyLogoInByte],
      AgencyFaviconInByte: [this.agencyFormData().AgencyFormData.AgencyFaviconInByte]
    });

    this.brandingForm.valueChanges.subscribe((values) => {
      const prevData = this.agencyFormData();
      this.agencyFormData.set({
        ...prevData,
        AgencyFormData: { ...prevData.AgencyFormData, ...values }
      });
    });
  }

  handleFileInput(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.brandingForm.patchValue({ [field]: input.files[0] });
    }
  }

  saveChanges(): void {
    if (this.brandingForm.valid) {
      const formData = new FormData();
      formData.append('primaryColor', this.brandingForm.value.primaryColor);
      formData.append('fontColor', this.brandingForm.value.fontColor);
      if (this.brandingForm.value.agencyLogo) {
        formData.append('agencyLogo', this.brandingForm.value.agencyLogo);
      }
      if (this.brandingForm.value.favicon) {
        formData.append('favicon', this.brandingForm.value.favicon);
      }

      // this.http.post('/api/branding-preferences', formData).subscribe(response => {
      //   console.log('Branding Preferences Saved:', response);
      // });
    }
  }

  convertFileToBase64(file: any, field: 'AgencyLogoInByte' | 'AgencyFaviconInByte'): void {
    if(!file){
      this.brandingForm.patchValue({ [field]: '' });
      const prevData = this.agencyFormData();
      this.agencyFormData.set({
        ...prevData,
        AgencyFormData: {
          ...prevData.AgencyFormData,
          [field]: ''
        }
      });

      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result as string;

      // ✅ Update Form Control
      this.brandingForm.patchValue({ [field]: base64String });

      // ✅ Update Signal
      const prevData = this.agencyFormData();
      this.agencyFormData.set({
        ...prevData,
        AgencyFormData: {
          ...prevData.AgencyFormData,
          [field]: base64String
        }
      });
    };
  }
}
