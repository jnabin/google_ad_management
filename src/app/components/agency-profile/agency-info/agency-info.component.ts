import { Component, effect, inject, OnInit, WritableSignal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgencyFormWrapperDto } from '../../../models/agency-profile';
import { AGENCY_FORM_DATA, SAVE_FORM } from '../agency-profile.component';

@Component({
  selector: 'app-agency-info',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
     MatInputModule, 
     MatFormFieldModule, 
     MatButtonModule
    ],
  templateUrl: './agency-info.component.html',
  styleUrl: './agency-info.component.css'
})
export class AgencyInfoComponent implements OnInit{
  agencyFormData: WritableSignal<AgencyFormWrapperDto> = inject(AGENCY_FORM_DATA);
  saveForm = inject<() => void>(SAVE_FORM);
  agencyForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    effect(() => {
      const updatedData = this.agencyFormData().AgencyFormData;
      this.agencyForm.patchValue(updatedData, { emitEvent: false });
    });
  }
  ngOnInit(): void {
    this.agencyForm = this.fb.group({
      AgencyName: [this.agencyFormData().AgencyFormData.AgencyName, Validators.required],
      AgencyEmail: [this.agencyFormData().AgencyFormData.AgencyEmail, [Validators.required, Validators.email]],
      AgencyAddress: [this.agencyFormData().AgencyFormData.AgencyAddress, Validators.required],
      AgencyContactNo: [this.agencyFormData().AgencyFormData.AgencyContactNo, [Validators.required, Validators.pattern('^[0-9]+$')]],
      AgencyWebsite: [this.agencyFormData().AgencyFormData.AgencyWebsite, Validators.required]
    });

    this.agencyForm.valueChanges.subscribe((updatedData) => {
      const prevData = this.agencyFormData();
      this.agencyFormData.set({
        ...prevData,
        AgencyFormData: { ...prevData.AgencyFormData, ...updatedData }
      });
    });
  }

  resetForm(): void {
    this.agencyForm.reset();
  }

  saveChanges(): void {
    if (this.agencyForm.valid) {
      console.log(this.agencyForm.value);
      // this.http.post('/api/agency-info', this.agencyForm.value).subscribe(response => {
      //   console.log('Agency Information Saved:', response);
      // });
    }
  }
}
