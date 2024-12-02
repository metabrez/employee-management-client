import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFormComponent } from './employee-form.component';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let mockEmployeeService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;
  beforeEach(async () => {
    mockEmployeeService = jasmine.createSpyObj([
      'getEmployee',
      'createEmployee',
      'updateEmployee',
    ]);
    mockRouter = jasmine.createSpyObj(['navigate']);
    mockActivatedRoute = { snapshot: { paramMap: { get: () => null } } };
    await TestBed.configureTestingModule({
      declarations: [EmployeeFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: EmployeeService, useValue: mockEmployeeService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call createEmployee when submitting a new employee', () => {
    mockActivatedRoute.snapshot.paramMap.get = () => null;
    component.isEditMode = false;
    component.employee = {
      username: 'user3',
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      age: 35,
      address: '789 Maple St',
    };
    mockEmployeeService.createEmployee.and.returnValue(of(component.employee));
    component.onSubmit();
    expect(mockEmployeeService.createEmployee).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/employees']);
  });
  it('should call updateEmployee when submitting an existing employee', () => {
    mockActivatedRoute.snapshot.paramMap.get = () => '1';
    component.isEditMode = true;
    component.employee = {
      id: 1,
      username: 'user1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      age: 30,
      address: '123 Main St',
    };
    mockEmployeeService.updateEmployee.and.returnValue(of(component.employee));
    component.onSubmit();
    expect(mockEmployeeService.updateEmployee).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/employees']);
  });
});
