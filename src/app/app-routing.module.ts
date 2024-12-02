import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';

const routes: Routes = [{ path: '', redirectTo: '/employees', pathMatch: 'full' },
{ path: 'employees', component: EmployeeListComponent}, 
{ path: 'employees/new', component: EmployeeFormComponent }, 
{ path: 'employees/:id', component: EmployeeDetailsComponent }, 
{ path: 'employees/:id/edit', component: EmployeeFormComponent },
{path:'delete/:id', component: DeleteEmployeeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
