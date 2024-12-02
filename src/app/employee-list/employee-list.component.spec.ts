import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeService } from '../employee.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let mockEmployeeService: any;

  beforeEach(async () => {
    mockEmployeeService = jasmine.createSpyObj([
      'getEmployees',
      'deleteEmployee',
    ]);

    await TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
      providers: [{ provide: EmployeeService, useValue: mockEmployeeService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    mockEmployeeService.getEmployees.and.returnValue(
      of([
        {
          id: 1,
          username: 'user1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          age: 30,
          address: '123 Main St',
        },
        {
          id: 2,
          username: 'user2',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          age: 28,
          address: '456 Elm St',
        },
      ])
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list all employees', () => {
    const debugElements: DebugElement[] = fixture.debugElement.queryAll(
      By.css('li')
    );
    expect(debugElements.length).toBe(2);
    expect(debugElements[0].nativeElement.textContent).toContain('John Doe');
    expect(debugElements[1].nativeElement.textContent).toContain('Jane Smith');
  });

  it('should call deleteEmployee on delete button click', () => {
    spyOn(component, 'deleteEmployee').and.callThrough();
    const debugElement: DebugElement = fixture.debugElement.query(
      By.css('button')
    );
    debugElement.triggerEventHandler('click', null);
    expect(component.deleteEmployee).toHaveBeenCalledWith(1);
    mockEmployeeService.deleteEmployee.and.returnValue(of({}));
    fixture.detectChanges();
    expect(component.employees.length).toBe(1);
  });
});
