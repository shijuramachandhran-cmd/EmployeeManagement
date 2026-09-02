import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Sidebar } from './sidebar/sidebar';
import { Listdepartments } from "./Department/listdepartments/listdepartments";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Sidebar, Listdepartments],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Employee Management System');
}
