const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection');
const dept = require('./utils/department');
const roles = require('./utils/roles');
const employees = require('./utils/employees');
const mysql = require('mysql2');
const { append } = require('express/lib/response');
const e = require('express');

async function promptUser () {  
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
.then(answer => {
  console.log('choosing...'+ answer.choice);
  if (answer.choice === 'View departments') {
    dept.showDepartments()
    //setTimeout(promptUser(), 4*1000);
    .then(res => {
      promptUser();
    });
  } else if (answer.choice === 'View roles') {
    roles.showRoles()
    .then(res => {
      promptUser();
    });
  } else if (answer.choice === 'View employees') {
    employees.showEmployees()
    .then(res => {
      promptUser();
    });
  } else if (answer.choice === 'Add a department') {
    dept.addDepartment()
    .then(res => {
      promptUser();
    });
  } else if (answer.choice === 'Add a role') {
    roles.addRole()
    .then(res => {
      promptUser();
    });
  } else if (answer.choice === 'Add an employee') {
    employees.addEmployee()
    .then(res => {
      promptUser();
    });
  } else if (answer.choice ==='Update an employee role') {
    employees.updateEmployee() 
    .then(res => {
      promptUser();
    });
  } else if (answer.choice === 'End session.'){
      db.end();
      process.exit;
  }})
};

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log ("Welcome to the employee tracker database.");
  promptUser();
});

  