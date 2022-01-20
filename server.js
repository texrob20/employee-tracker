const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./db/connection'); //creates database connection
const dept = require('./utils/department'); //module providing all department requests
const roles = require('./utils/roles'); //module providing all roles requests
const employees = require('./utils/employees'); //module providing all employees requests
const mysql = require('mysql2');
const { append } = require('express/lib/response');
const e = require('express');

// function that prompts user to select an option
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
  // determines which function to execute based on user selection
  if (answer.choice === 'View departments') {
    dept.showDepartments() 
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
      process.exit;  //exits the app
  }})
};

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log ("Welcome to the employee tracker database.");
  promptUser();
});

  