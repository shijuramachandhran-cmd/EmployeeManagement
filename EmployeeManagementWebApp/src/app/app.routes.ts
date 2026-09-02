import { Routes } from '@angular/router';
import { Sidebar } from './sidebar/sidebar';
import { Listdepartments } from './Department/listdepartments/listdepartments';
import { AddDepartment } from './Department/add-department/add-department';
import { Listemployee } from './Employee/listemployee/listemployee';
import { Addemployee } from './Employee/addemployee/addemployee';

export const routes: Routes = [
    
    {path: 'listdepartments', component: Listdepartments},
    {path: 'adddepartment', component: AddDepartment},
    {path: 'employees', component: Listemployee},
    {path: 'addemployee', component: Addemployee},
];
