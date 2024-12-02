import { Component } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent {

  employee!: Employee | undefined;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) {

  }
  ngOnInit():void {
    this.getEmployeeById()
  }

  getEmployeeById() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(Number(id)).subscribe((data => {
        this.employee = data;
        console.log(this.employee)
        console.log('Hello')
      }))
    }

  }

  


}
