const inquirer = require('inquirer');
const db = require('../db/connection');
const util = require('util');
const cTable = require('console.table');
// node native promisify
const query1 = util.promisify(db.query).bind(db);

async function showEmployees() {
console.log ('Employees:');
try {
    const sql = `SELECT employees.id, 
    employees.first_name, 
    employees.last_name, 
    roles.title, 
    department.name AS department,
    roles.salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employees manager ON employees.manager_id = manager.id`;
  const rows = await query1(sql);
  console.table(rows);  
  console.log(' ');
  } finally {
   setTimeout(() => {}, 10000);
  }
}  

async function addEmployee() {
    await inquirer.prompt ([
        {
        type: 'input',
        message: "Please provide the first name of the new employee.",
        name: 'first_name',
        validate: function (ans) {
            if (ans) {
                return true;
            } else {
               return console.log("Please enter a name.");
            }
        }}, 
        {   
        type: 'input',
        message: "Please provide the last name of the new employee.",
        name: 'last_name',
        validate: function (ans) {
            if (ans) {
                return true;
            } else {
                return console.log("Please enter a name.");
            }
        }},
        {
        type: 'input',
        message: "Please provide the role ID of the new employee.",
        name: 'role_id',
        validate: function (ans) {
            if (ans) {
                return true;
            } else {
                return console.log("Please enter a role ID.");
            }
        }},
        {
        type: 'input',
        message: "Please provide the manager ID of the new employee.",
        name: 'manager_id',  
        }
      ])
    .then (answer => {
      const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                 VALUES (?,?,?,?)`;
      const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];     
      query1(sql, params);
      console.log('Added ' + answer.first_name +' '+ answer.last_name + ' to employees.');  
    })
};

async function updateEmployee () {
  await inquirer.prompt([
    {
        type: 'input',
        message: "Please provide the role ID of the new employee.",
        name: 'id',
        validate: function (ans) {
          if (ans) { return true;
          } else { return console.log("Please enter an employee ID."); }
        }
    },
    {
        type: 'input',
        message: "Please provide the new role ID of the employee.",
        name: 'role_id',
        validate: function (ans) {
          if (ans) { return true;
          } else { return console.log("Please enter a role ID."); }
        }
    }
  ])
  .then(answer => { 
    const sql = "UPDATE employees SET role_id = ? WHERE id = ?";
    const params = [answer.role_id, answer.id];
    console.log(params);
    query1(sql, params);
    console.log('The employee has been updated.');  
  });
};

module.exports = {showEmployees, addEmployee, updateEmployee};