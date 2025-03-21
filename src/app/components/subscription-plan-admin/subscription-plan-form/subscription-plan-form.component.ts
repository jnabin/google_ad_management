import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubscriptionPlanDto } from '../../../models/subscription-plan';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-subscription-plan-form',
  imports: [MatIconModule, NgIf, NgFor, MatButtonModule, ReactiveFormsModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatChipsModule],
  templateUrl: './subscription-plan-form.component.html',
  styleUrl: './subscription-plan-form.component.css'
})
export class SubscriptionPlanFormComponent implements OnInit{
  planData: SubscriptionPlanDto = new SubscriptionPlanDto();
  billingPeriods: {id: number; name: string}[] = [];
  planForm!: FormGroup;
  title = 'Edit Plan';
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {

  }
  ngOnInit(): void {
    console.log(this.planData);
    this.planForm = this.fb.group({
      SubsPlanId: [{ value: this.planData?.SubsPlanId, disabled: true }],
      SubsPlanName: [this.planData?.SubsPlanName, [Validators.required, Validators.minLength(3)]],
      SubsPlanDescription: [this.planData?.SubsPlanDescription, Validators.required],
      SubsPlanPrice: [this.planData?.SubsPlanPrice, [Validators.required, Validators.min(0)]],
      SubsPlanBillingPeriodId: [this.planData?.SubsPlanBillingPeriodId, Validators.required],
      SubsPlanIsActive: [this.planData?.SubsPlanIsActive],
      SubsPlanIsPopular: [this.planData?.SubsPlanIsPopular],
      SubsPlanDesignerCategory: [this.planData?.SubsPlanDesignerCategory, Validators.required],
      SubsPlanFeatures: this.fb.array(this.planData?.SubsPlanFeatures ?? [], Validators.required) // Dynamic feature list
    });
  }

  get SubsPlanFeatures(): FormArray {
    return this.planForm.get('SubsPlanFeatures') as FormArray;
  }

  addFeature(featureInput: HTMLInputElement) {
    if (featureInput.value.trim()) {
      this.SubsPlanFeatures.push(this.fb.control(featureInput.value));
      featureInput.value = '';
    }
  }

  closeModal() {
    this.activeModal.dismiss('cancel');
  }


  onSubmit() {
    if (this.planForm.valid) {
      console.log('Form Submitted:', this.planForm.value);
      this.activeModal.close(this.planForm.value); // Close modal and pass the form data
    } else {
      console.log('Form is invalid');
    }
  }

  triggerSubmit() {
    // if (this.teamForm.valid) {
    //   this.onSubmit();  // Call onSubmit directly
    // } else {
    //   this.teamForm.markAllAsTouched();  // Trigger validation
    // }
  }

  removeFeature(index: number) {
    this.SubsPlanFeatures.removeAt(index);
  }
}
