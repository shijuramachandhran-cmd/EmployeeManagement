import { Component, inject, OnInit } from '@angular/core';
import { Api } from '../../Service/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideToastr, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-department',
  imports: [ReactiveFormsModule],
  templateUrl: './add-department.html',
  styleUrl: './add-department.css',
})
export class AddDepartment implements OnInit {
httpService = inject(Api);
router = inject(Router);
route = inject(ActivatedRoute);
toastr = inject(ToastrService);
 departmentForm!: FormGroup;
 departmentId: number | null = null;
  isEditMode = false;

 ngOnInit() {
    this.departmentForm = new FormGroup({
      Name: new FormControl('', Validators.required),
    });

    this.route.queryParams.subscribe(params => {

      if (params['id']) {
        this.departmentId = Number(params['id']);
        this.isEditMode = true;
        this.getDepartment(this.departmentId);
      }

    });
 }

 SaveDepartment(){
  if (this.departmentForm.valid) {
    const departmentData = this.departmentForm.value;
    console.log('Department data to be added:', departmentData);
    this.httpService.AddDepartment(departmentData).subscribe({
      next: (res) => {
        console.log('Department added successfully:', res);
        this.departmentForm.reset();
        this.router.navigate(['/listdepartments']);
      },
      error: (error) => {
        console.error('Error adding department:', error);
      }
    });
  }
  else {
      this.toastr.error('', 'Please fill all required fields correctly.');
    }
 }

 getDepartment(departmentId: number) {
  this.httpService.getDepartmentById(departmentId).subscribe({
    next:(res) => {
      this.departmentForm.patchValue({
        Name: res.name
      });
    },
    error: (error) => {
        console.error('Error fetching department:', error);
      }
  });
 
 }
 Cancel(){
  this.router.navigate(['/listdepartments']);
 }

}
