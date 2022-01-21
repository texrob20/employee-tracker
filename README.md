## Employee Track

GIVEN a command-line application that accepts user input:

- WHEN I start the application THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- WHEN I choose to view all departments THEN I am presented with a formatted table showing department names and department ids
- WHEN I choose to view all roles THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- WHEN I choose to view all employees THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- WHEN I choose to add a department THEN I am prompted to enter the name of the department and that department is added to the database
- WHEN I choose to add a role THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- WHEN I choose to add an employee THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
- WHEN I choose to update an employee role THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Created With
- Node js
  - Inquirer
  - MySQL2
  - Console.table
  - util
- MySQL

## Database Setup
The schema and seeds file in the db folder are used to create the company database with 3 tables - department, roles, employees.  The seeds file creates the first 4 departments, 4 roles, and 10 employees.

## Command Line Interface
Upon starting the server.js app, the user is prompted to select between a number of different options:
- View departments
- View employees by department
- View roles
- View employees
- View employees by manager
- Add a department
- Add a role
- Add an employee
- Update an employee role
- Update an employee manager
- Delete a department
- Delete a role
- Remove an employee
- View department budget
- End session

When the user selects an option, the user is either provided a table of the requested view, an input to add, an input to update, or an option to delete.  When the user selects 'End session', the app is closed and the user is returned to the command prompt.

## Demo Video

https://github.com/texrob20/employee-tracker/blob/main/demo/employee-tracker-demo.webm or

http://watch.screencastify.com/

