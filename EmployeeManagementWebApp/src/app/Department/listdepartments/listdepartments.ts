import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Api } from '../../Service/api';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { IDepartment } from '../../Types/department';

@Component({
  selector: 'app-listdepartments',
  imports: [CommonModule, RouterLink],
  templateUrl: './listdepartments.html',
  styleUrl: './listdepartments.css',
})
export class Listdepartments implements OnInit {
httpService = inject(Api);
router = inject(Router);
departments: any = [];
department: any;
http = inject(HttpClient);
  changeDetector = inject(ChangeDetectorRef);
  openDepartmentId: number | null = null;

ngOnInit() {
  this.getDepartments();
}

getDepartments() {  
this.httpService.ListAllDepartments().subscribe({
      next: (res) => {
        this.departments = res;
        this.changeDetector.markForCheck();
        console.log('Departments fetched successfully:', this.departments);
      },
      error: (error) => {
        console.error('Error fetching departments:', error);
      },
    });

}
editDepartment(department: IDepartment) {
this.router.navigate(['/adddepartment'], { queryParams: { id: department.id } });
}
toggleDropdown(departmentId: number): void {
  this.openDepartmentId = this.openDepartmentId === departmentId ? null : departmentId;
}

}

