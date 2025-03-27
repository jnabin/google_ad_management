import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  SubscriptionPlanDto,
  SubscriptionPlanFeatureDto,
} from '../../../models/subscription-plan';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { ToastService } from '../../../common/services/toast.service';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-subscription-plan-form',
  imports: [
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
  ],
  templateUrl: './subscription-plan-form.component.html',
  styleUrl: './subscription-plan-form.component.css',
})
export class SubscriptionPlanFormComponent implements OnInit {
  planData: SubscriptionPlanDto = new SubscriptionPlanDto();
  billingPeriods: { id: number; name: string }[] = [];
  subscriptionPlanFeatures: {
    id: number;
    name: string;
    type: string;
  }[] = [];
  featureBooleanList = [
    {id: 1, name: 'Yes'},
    {id: 2, name: 'No'}
  ];
  toastService = inject(ToastService);
  planForm!: FormGroup;
  title = 'Edit Plan';
  mode: string = 'new';
  isCustomFeatures = signal(false);
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {}
  ngOnInit(): void {
    console.log(this.planData);
    this.planForm = this.fb.group({
      SubsPlanId: [{ value: this.planData?.SubsPlanId, disabled: true }],
      SubsPlanName: [
        this.planData?.SubsPlanName,
        [Validators.required, Validators.minLength(3)],
      ],
      SubsPlanDescription: [
        this.planData?.SubsPlanDescription,
        Validators.required,
      ],
      SubsPlanPrice: [
        this.planData?.SubsPlanPrice,
        [Validators.required, Validators.min(0)],
      ],
      SubsPlanBillingPeriodId: [
        this.planData?.SubsPlanBillingPeriodId,
        Validators.required,
      ],
      SubsPlanIsActive: [this.planData?.SubsPlanIsActive],
      SubsPlanIsPopular: [this.planData?.SubsPlanIsPopular],
      CurrentFeatureId: [0],
      CurrentFeatureValue: [null],
      SubsPlanDesignerCategory: [
        this.planData?.SubsPlanDesignerCategory,
        Validators.required,
      ],
      SubsPlanFeatures: this.fb.array(
        this.planData?.SubsPlanFeatures ?? [],
        Validators.required
      ), // Dynamic feature list
    });
    if (this.mode == 'view') {
      this.disableAllControls(this.planForm);
    }
  }

  disableAllControls(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        // Recursively disable controls in FormGroup
        this.disableAllControls(control);
      } else {
        control?.disable();
      }
    });
  }
  get SubsPlanFeatures(): FormArray {
    return this.planForm.get('SubsPlanFeatures') as FormArray;
  }

  get SubsPlanFeaturesId(): any {
    return (this.planForm.get('CurrentFeatureId') as FormControl).value;
  }
  get SelectedFeatureType(): string | any{
    return this.subscriptionPlanFeatures.find(x => x.id == this.SubsPlanFeaturesId)?.type;
  }
  get SubsPlanFeaturesValue(): FormArray {
    return (this.planForm.get('CurrentFeatureValue') as FormControl).value;
  }

  toggleChange(val: MatSlideToggleChange) {
    this.isCustomFeatures.set(val.checked);
  }

  addFeature(featureInput: HTMLInputElement) {
    if(!featureInput.value){
      this.toastService.showMessage("warning", "Please provide the feature name");
      return;
    }
    let plan = new SubscriptionPlanFeatureDto();
    plan.SubsPlanFeatureId = 0;
    plan.SubsPlanFeatureName = featureInput.value;
    plan.SubsPlanFeatureValue = 1;
    plan.SubsPlanFeatureType = 'boolean';
    if (featureInput.value.trim()) {
      this.SubsPlanFeatures.push(this.fb.control(plan));
      featureInput.value = '';
    }
  }

  addPredefinedFeature(value: any) {
    let isAvailable = this.SubsPlanFeatures.controls.find(
      (x) => x.value.SubsPlanFeatureId && x.value.SubsPlanFeatureId == value.SubsPlanFeatureId 
    );
    if(!value.SubsPlanFeatureId || !value.SubsPlanFeatureValue){
      this.toastService.showMessage("warning", "Please select the feature name and value");
      return;
    }
    if(!isAvailable){
      let plan = new SubscriptionPlanFeatureDto();
      plan.SubsPlanFeatureId = value.SubsPlanFeatureId;
      plan.SubsPlanFeatureName = (this.subscriptionPlanFeatures.find(x => x.id == value.SubsPlanFeatureId)?.name) as string;
      plan.SubsPlanFeatureValue = value.SubsPlanFeatureValue;
      plan.SubsPlanFeatureType = this.subscriptionPlanFeatures.find(x => x.id == value.SubsPlanFeatureId)?.type;
      this.SubsPlanFeatures.push(this.fb.control(plan));
    } else {
      this.planForm.get('CurrentFeatureId')?.setValue(null);
      this.planForm.get('CurrentFeatureValue')?.setValue(null);
      this.toastService.showMessage("warning", "Plan already selected");
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
    if (this.planForm.valid) {
      this.onSubmit(); // Call onSubmit directly
    } else {
      this.planForm.markAllAsTouched(); // Trigger validation
    }
  }

  removeFeature(index: number) {
    this.SubsPlanFeatures.removeAt(index);
  }
}
