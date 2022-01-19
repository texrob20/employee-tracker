const express = require('express');
const cTable = require('console.table');
const inquirer = require('inquirer');

function init () {
console.log ("Welcome to the employee tracker.");    
inquirer.prompt ([{
  type: 'list',
  message: "Please select which you would like to do.",
  choices: ['View departments', 'View roles', 'View employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee'],
  name: 'choice'
}])
.then((answer) => {
if (answer === 'View departments') {
  fetch ('/departments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
   })
   console.table(body);
} else if (answer === 'View roles') {
    fetch ('/roles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    })
    console.table(body);
} else if (answer === 'View employees') {
    fetch ('/employees', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
    })
    console.table(body);
} else if (answer === 'Add a department') {
  addDepartment();
} else if (answer === 'Add a role') {
  addRole();
} else if (answer === 'Add an employee') {
  addEmployee();
} else if (answer ==='Update an employee') {
  updateEmployee();
};
})
.catch((error) => {
    
})}

function addDepartment(){
    
    fetch ('/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
    })
};

function addRole() {

    fetch ('/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
    })
};

function addEmployee() {

    fetch ('/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
    })
};

function updateEmployee() {

    fetch ('/employee/:id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
    })
};

init();