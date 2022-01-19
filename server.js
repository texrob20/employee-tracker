const cTable = require('console.table');
const db = require('./db/connection');
const dept = requre('./utils/department');
const roles = require('./utils/roles');
const employees = require('.utils/employees');

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    console.log ("Welcome to the employee tracker database.");  
});

const promptUser = () => {
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
  if (answer === 'View departments') {
    showDepartments();
    promptUser();
  } else if (answer === 'View roles') {
    showRoles();
    promptUser();
  } else if (answer === 'View employees') {
    showEmployees();
    promptUser();
  } else if (answer === 'Add a department') {
    addDepartment();
    promptUser();
  } else if (answer === 'Add a role') {
    addRole();
    promptUser();
  } else if (answer === 'Add an employee') {
    addEmployee();
    promptUser();
  } else if (answer ==='Update an employee') {
    updateEmployee();
    promptUser();
  };
  })
};

promptUser();