import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent {
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  employee: Employee = {
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
    address: '',
  };

  isEditMode: boolean = false;
  isInValid: boolean = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log(id);
      this.isEditMode = true;
      this.employeeService
        .getEmployeeById(Number(id))
        .subscribe((data: Employee) => {
          this.employee = data;
          console.log(this.employee);
        });
    }
  }

  /*  onSubmit(editForm: NgForm): void {
     if (editForm.valid) {
       this.isInValid = false;
       if (this.isEditMode) {
         this.employeeService.updateEmployee(this.employee.id!, this.employee)
           .subscribe(() => {
             this.router.navigate(['/employees']);
 
           });
       }
 
     } else {
       this.employeeService.addEmployee(this.employee).subscribe(() => {
         this.router.navigate(['/employees']);
       });
     }
 
   } */

  onSubmit(editForm: NgForm): void {
    if (editForm.valid) {
      this.isInValid = false;
      if (this.isEditMode) {
        this.employeeService
          .updateEmployee(this.employee.id!, this.employee)
          .subscribe(() => {
            this.router.navigate(['/employees']);
          });
      } else {
        this.employeeService.addEmployee(this.employee).subscribe(() => {
          this.router.navigate(['/employees']);
        });
      }
    } else {
      this.isInValid = true;
      Object.keys(editForm.controls).forEach((key) => {
        const control = editForm.controls[key];
        control.markAllAsTouched();
      });
    }
  }
}
