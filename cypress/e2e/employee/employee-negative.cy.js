describe('Employee Management - Negative Test Cases', () => {

  beforeEach(() => {
    // Visit the base URL before each test
    cy.visit('http://localhost:4200');
  });

  it('should not create a new employee with missing required fields', () => {
    cy.get('a[href="/employees/new"]').click();
    
    // Leaving all required fields empty and submitting the form
    cy.get('button[type="submit"]').click();

    // Verify that error messages are displayed
    cy.get('.error').should('contain', 'Username is required');
    cy.get('.error').should('contain', 'First Name is required');
    cy.get('.error').should('contain', 'Last Name is required');
    cy.get('.error').should('contain', 'Email is required');
    cy.get('.error').should('contain', 'Age is required');
    cy.get('.error').should('contain', 'Address is required');

    // Verify that the employee is not added to the list
    cy.visit('/');
    cy.get('table tbody tr').should('have.length', 0); // Assuming no employee exists initially
  });

  it('should not create a new employee with invalid email format', () => {
    cy.get('a[href="/employees/new"]').click();
    cy.get('input[name="username"]').type('johndoe');
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="age"]').type('30');
    cy.get('input[name="address"]').type('1234 Elm Street');
    cy.get('button[type="submit"]').click();

    // Verify that error message for invalid email is displayed
    cy.get('.error').should('contain', 'Valid Email is required');

    // Verify that the employee is not added to the list
    cy.visit('/');
    cy.get('table tbody tr').should('have.length', 0); // Assuming no employee exists initially
  });

  it('should not create a new employee with age less than minimum allowed value', () => {
    cy.get('a[href="/employees/new"]').click();
    cy.get('input[name="username"]').type('johndoe');
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="age"]').type('15'); // Assuming minimum age is 18
    cy.get('input[name="address"]').type('1234 Elm Street');
    cy.get('button[type="submit"]').click();

    // Verify that error message for age is displayed
    cy.get('.error').should('contain', 'Age must be at least 18');

    // Verify that the employee is not added to the list
    cy.visit('/');
    cy.get('table tbody tr').should('have.length', 0); // Assuming no employee exists initially
  });

  it('should not update an employee with invalid data', () => {
    // Navigate to edit the first employee in the list
    cy.get('table tbody tr').first().find('a[href*="edit"]').click();
    cy.get('input[name="firstName"]').clear().type('');
    cy.get('button[type="submit"]').click();

    // Verify that error message for first name is displayed
    cy.get('.error').should('contain', 'First Name is required');

    // Verify that the employee's first name is not updated in the list
    cy.visit('/');
    cy.get('table tbody tr').first().contains('Jane'); // Assuming the first employee's name was previously set to "Jane"
  });

});
