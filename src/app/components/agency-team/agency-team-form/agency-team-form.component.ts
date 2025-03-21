import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import { NgFor, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-agency-team-form',
  imports: [
    ReactiveFormsModule,MatFormFieldModule, 
    MatInputModule, MatButtonModule, MatIconModule, 
    MatOptionModule, MatSelectModule, NgFor,
    NgIf],
  templateUrl: './agency-team-form.component.html',
  styleUrl: './agency-team-form.component.css'
})
export class AgencyTeamFormComponent {
  @Input() teamData: any;  // Input data passed from parent (Optional for editing)
  @Input() categories: any[] = [];  // Input data passed from parent (Optional for editing)
  @Input() roles: any[] = [];  // Input data passed from parent (Optional for editing)
  teamForm!: FormGroup;
  title = "Add New Team Member";
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    // Initialize the form
    this.teamForm = this.fb.group({
      UserSystemId: [{ value: '', disabled: true }, Validators.required],
      UserUniqueCode: ['', Validators.required],
      UserFirstName: ['', Validators.required],
      UserLastName: ['', Validators.required],
      UserMail: ['', [Validators.required, Validators.email]],
      UserContactNo: ['', Validators.required],
      UserCategoryId: ['', Validators.required],
      UserRoleId: ['', Validators.required],
      UserName: ['', Validators.required],
      UserPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // If there's data passed to the modal (for editing), patch the form
    if (this.teamData) {
      this.teamForm.patchValue(this.teamData);
    }
  }

  // Method to submit the form
  onSubmit() {
    if (this.teamForm.valid) {
      console.log('Form Submitted:', this.teamForm.value);
      this.activeModal.close(this.teamForm.value); // Close modal and pass the form data
    } else {
      console.log('Form is invalid');
    }
  }

  // Method to dismiss the modal
  closeModal() {
    this.activeModal.dismiss('cancel');
  }

  triggerSubmit() {
    if (this.teamForm.valid) {
      this.onSubmit();  // Call onSubmit directly
    } else {
      this.teamForm.markAllAsTouched();  // Trigger validation
    }
  }

}
