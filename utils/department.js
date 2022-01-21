const inquirer = require('inquirer');
const db = require('../db/connection');
const util = require('util');
const cTable = require('console.table');
// node native promisify
const query1 = util.promisify(db.query).bind(db);

// function that displays the current list of departments
async function showDepartments() {
  console.log ('Departments:\n');
  try {
    const sql = `SELECT department.id AS id, department.name AS department FROM department`;
    const rows = await query1(sql);
    console.table(rows);  
    console.log(' ');
  } finally {
    return true;
  }
}  

// user can provide the name of a new department to add to the database
async function addDepartment () {
  await inquirer.prompt([
    {
      type: 'input', 
      name: 'name',
      message: "What department do you want to add?",
      validate: name => {
        if (name) {
            return true;
        } else {
            console.log('Please enter a department');
            return false;
        }
      }
    }
  ])
  .then(answer => {
    const sql = `INSERT INTO department (name)
                 VALUES (?)`;
    const rows = query1(sql, answer.name);
    console.log('Added ' + answer.name + " to departments.");  
    return answer;
  });
};

// user can provide the ID of the department to delete from the database
async function deleteDepartment () {
  await inquirer.prompt([
    {
      type: 'input', 
      name: 'id',
      message: "Provide the ID of the department to delete?",
      validate: name => {
        if (name) {
            return true;
        } else {
            console.log('Please enter a department ID');
            return false;
        }
      }
    }
  ])
  .then(answer => {
    const sql = `DELETE FROM department WHERE id = ?`
    const rows = query1(sql, answer.id);
    console.log('Deleted the department.');  
    return answer;
  });
};

// function that displays the current employees by their departments
async function departmentEmployees() {
  console.log ('Employees grouped by their departments:\n');
  try {
    const sql = `SELECT employees.first_name, employees.last_name, department.name AS department
                 FROM employees
                 LEFT JOIN roles ON employees.role_id = roles.id 
                 LEFT JOIN department ON roles.department_id = department.id
                 ORDER BY department ASC`;
    const rows = await query1(sql);
    console.table(rows);  
    console.log(' ');
  } finally {
    return true;
  }
}  

// function that displays the current employees by their departments
async function departmentBudget() {
  console.log ('department salary expense for employees:\n');
  try {
    const sql = `SELECT department_id AS id, department.name AS department,
                 SUM(salary) expense
                 FROM roles
                 JOIN department ON roles.department_id = department.id                 
                 GROUP BY department_id
                 ORDER BY department ASC`;
    const rows = await query1(sql);
    console.table(rows);  
    console.log(' ');
  } finally {
    return true;
  }
} 

module.exports = {
  showDepartments, 
  addDepartment,
  deleteDepartment,
  departmentEmployees,
  departmentBudget};