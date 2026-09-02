import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Api } from '../../Service/api';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Addemployee } from '../addemployee/addemployee';

@Component({
  selector: 'app-listemployee',
  standalone: true,
  imports: [CommonModule, RouterLink, Addemployee],
  templateUrl: './listemployee.html',
  styleUrl: './listemployee.css',
})
export class Listemployee implements OnInit {
httpService = inject(Api);
router = inject(Router);
showAddEmployee = false;
changeDetector = inject(ChangeDetectorRef);
employees: any = [];
openEmployeeId: number | null = null;

ngOnInit() {
  this.getEmployees();
}
toggleDropdown(employeeId: number): void {

    this.openEmployeeId =
      this.openEmployeeId === employeeId
        ? null
        : employeeId;
  }
getEmployees(){
  this.httpService.getAllEmployees().subscribe({
    next: (res) => {
      this.employees = res;
      this.changeDetector.markForCheck();
      console.log('Employees fetched successfully:', this.employees);
    },
    error: (error) => {
      console.error('Error fetching employees:', error);
    },
  });
}
openAddEmployee(): void {
  this.showAddEmployee = true;
}
closeAddEmployee(): void {
  this.showAddEmployee = false;
  this.getEmployees();
}

}
