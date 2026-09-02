import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IDepartment } from '../Types/department';
import { Employee } from '../Types/employee';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient);
  public baseUrl = 'https://localhost:7189/api/';
  ListAllDepartments(){
    var fullUrl = this.baseUrl + 'Department';
    console.log('Full URL for ListAllDepartments:', fullUrl);
    return this.http.get<IDepartment[]>(fullUrl);
  }
  AddDepartment(departmentData: any) {
    var fullUrl = this.baseUrl + 'Department/save';
    console.log('Full URL for AddDepartment:', fullUrl);
    return this.http.post(fullUrl, departmentData);
  }
  getDepartmentById(id: number) {
    var fullUrl = this.baseUrl + `Department/${id}`;
    return this.http.get<IDepartment>(fullUrl);
  }
  getAllEmployees(){
    var fullUrl = this.baseUrl + 'Employee';
    console.log('Full URL for getAllEmployees:', fullUrl);
    return this.http.get<Employee[]>(fullUrl);
  }
  saveEmployee(employeeData: any) {
    var fullUrl = this.baseUrl + 'Employee/save';
    console.log('Full URL for saveEmployee:', fullUrl);
    return this.http.post(fullUrl, employeeData);
  }
}
