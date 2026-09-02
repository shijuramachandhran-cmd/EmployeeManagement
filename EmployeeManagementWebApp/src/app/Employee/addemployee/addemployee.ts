import { Component, inject, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { provideToastr, ToastrService } from 'ngx-toastr';

import { Api } from '../../Service/api';
import { error } from 'console';

@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './addemployee.html',
  styleUrl: './addemployee.css',
})
export class Addemployee implements OnInit {
  httpService = inject(Api);
  departments: any[] = [];
  filteredDepartments: any[] = [];
  selectedDepartmentName = '';
  showDepartmentDropdown = false;
highlightedDepartmentIndex = -1;
  toastr = inject(ToastrService);
   @Output() employeeSaved = new EventEmitter<void>();
  employeeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    departmentId: new FormControl<number | null>(
      null,
      Validators.required
    ),
    salary: new FormControl<number | null>(
      null,
      [
        Validators.required,
        Validators.min(0)
      ]
    ),
    phoneNumber: new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]
    ),
    joiningDate: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    email: new FormControl(
      '',
      [
        Validators.required,
        Validators.email
      ]
    ),

    gender: new FormControl('', Validators.required)

  });

  ngOnInit() {
    this.getDepartments();
  }

  SaveEmployee(): void {

    // Check form validation
    if (this.employeeForm.invalid) {
      //this.toastr.error('', 'Please fill all required fields correctly.');            
      this.employeeForm.markAllAsTouched();
      return;
    }


    // Get form data
    const employeeData = this.employeeForm.value;

    console.log(
      'Employee data to be added:',
      employeeData
    );


    // Call API
    this.httpService.saveEmployee(employeeData).subscribe({

      next: (res) => {

        console.log(
          'Employee added successfully:',
          res
        );


        // Clear form
        this.employeeForm.reset();


        // Tell parent component that save is completed
        this.employeeSaved.emit();

      },


      error: (error) => {

        console.error(
          'Error adding employee:',
          error
        );

      }

    });

  }


  // Cancel button
  Cancel(): void {

    // Clear form
    this.employeeForm.reset();

    // Tell parent to close popup
    this.employeeSaved.emit();

  }

  getDepartments() {  
    this.httpService.ListAllDepartments().subscribe({
          next: (res) => {
            this.departments = res;
            this.filteredDepartments = res;
            //this.changeDetector.markForCheck();
            console.log('Departments fetched successfully:', this.departments);
          },
          error: (error) => {
            console.error('Error fetching departments:', error);
          },
        });
  }

  searchDepartment(event: Event): void {

  const searchText = (event.target as HTMLInputElement)
    .value
    .toLowerCase()
    .trim();

  // If user starts typing again, remove the previous selection
  this.employeeForm.patchValue({
    departmentId: null
  });

  this.selectedDepartmentName = searchText;

  this.filteredDepartments = this.departments.filter(
    department =>
      department.name.toLowerCase().includes(searchText)
  );

  this.showDepartmentDropdown = true;
}


selectDepartment(department: any): void {

  // Set selected department name in input
  this.selectedDepartmentName = department.name;

  // Set department ID in reactive form
  this.employeeForm.patchValue({
    departmentId: department.id
  });

  // Hide dropdown
  this.showDepartmentDropdown = false;

  // Clear filtered list
  this.filteredDepartments = [];
}


}
