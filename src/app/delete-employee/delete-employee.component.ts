import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.css'
})
export class DeleteEmployeeComponent {

  employeeId!: number;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.employeeId = +this.route.snapshot.paramMap.get('id')!;
  }

  confirmDelete(): void {
    this.employeeService.deleteEmployee(this.employeeId).subscribe(() => {

      alert('Employee successfully Delete');
      this.router.navigate(['/employees'])
    })
  }
  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
