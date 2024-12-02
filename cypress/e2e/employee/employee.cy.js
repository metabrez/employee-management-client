describe('Employee Management', () => {

  beforeEach(() => {
    // Visit the base URL before each test
    cy.visit('http://localhost:4200');
  });

  it('should display the employee list', () => {
    cy.get('h2').contains('Employee List');
    cy.get('table').should('exist');
    cy.get('table tbody tr').should('have.length.greaterThan', 0); // Ensure that there's at least one employee in the list
  });

  it('should create a new employee', () => {
    cy.get('a[href="/employees/new"]').click();
    cy.get('input[name="username"]').type('johndoe');
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="age"]').type('30');
    cy.get('input[name="address"]').type('1234 Elm Street');
    cy.get('button[type="submit"]').click();

    // Verify that the new employee is added to the list
    cy.get('table tbody tr').last().contains('johndoe');
    cy.get('table tbody tr').last().contains('John');
    cy.get('table tbody tr').last().contains('Doe');
  });

  it('should update an existing employee', () => {
    // Navigate to edit the first employee in the list
    cy.get('table tbody tr').first().find('a[routerLink*="/employees/1/edit"]').click();
    cy.get('input[name="firstName"]').clear().type('Jane');
    cy.get('button[type="submit"]').click();

    // Verify that the employee's first name is updated
    cy.get('table tbody tr').first().contains('Jane');
  });

  it('should delete an employee', () => {
    // Navigate to delete the first employee in the list
    cy.get('table tbody tr').first().find('button.delete-button').click();

    // Verify that the employee is removed from the list
    cy.get('table tbody tr').should('have.length.lessThan', initialEmployeeCount);
  });
});
