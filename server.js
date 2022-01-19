const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const dept = require('./utils/department');
const roles = require('./utils/roles');
const employees = require('./utils/employees');
const mysql = require('mysql2');

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log ("Welcome to the employee tracker database.");
    promptUser();  
});

function promptUser () {  
  inquirer.prompt ([{
    type: 'list',
    message: "Please select which you would like to do.",
    choices: ['View departments', 
              'View roles', 
              'View employees', 
              'Add a department', 
              'Add a role', 
              'Add an employee', 
              'Update an employee role',
              'End session.'],
    name: 'choice'
  }])
  .then((answer) => {
  if (answer.choice === 'View departments') {
    dept.showDepartments()

  } else if (answer.choice === 'View roles') {
    roles.showRoles();
    promptUser();
  } else if (answer.choice === 'View employees') {
    employees.showEmployees();
    promptUser();
  } else if (answer.choice === 'Add a department') {
    dept.addDepartment();
    promptUser();
  } else if (answer.choice === 'Add a role') {
    roles.addRole();
    promptUser();
  } else if (answer.choice === 'Add an employee') {
    employees.addEmployee();
    promptUser();
  } else if (answer.choice ==='Update an employee') {
    employees.updateEmployee();
    promptUser();
  } else if (answer.choice === 'End Session') {
    db.end();
  };
  })

};

showDepartments = () => {
  console.log ('Departments:');
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;
  db.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows); 
      promptUser(); 
    })   
  }

