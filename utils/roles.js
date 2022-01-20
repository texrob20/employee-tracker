const inquirer = require('inquirer');
const db = require('../db/connection');
const util = require('util');
const cTable = require('console.table');
// node native promisify
const query1 = util.promisify(db.query).bind(db);

// function that displays the roles and includes the name of the department
async function showRoles() {
console.log ('Roles:\n');
try {
  const sql = `SELECT roles.id, roles.title, department.name AS department
               FROM roles
               INNER JOIN department ON roles.department_id = department.id`;
  const rows = await query1(sql);
  console.table(rows);  
  console.log(' ');
  } finally {
    return true;
  }
}  

// user inputs title, salary, and department ID for new role to be added to database
async function addRole () {
    await inquirer.prompt ([
        {
        type: 'input',
        message: "Please provide the title of the new role.",
        name: 'title',
        validate: function (ans) {
            if (ans) {
                return true;
            } else {
               return console.log("Please enter a title.");
            }
        }},
        {
        type: 'input',
        message: "Please provide the salary of the new role.",
        name: 'salary',
        validate: function (ans) {
            if (ans) {
                return true;
            } else {
                return console.log("Please enter a salary.");
            }
        }},
        {
        type: 'input',
        message: "Please provide the department ID of the new role.",
        name: 'department_id',
        validate: function (ans) {
            if (ans) {
                return true;
            } else {
                return console.log("Please enter a department ID.");
            }}            
        }])
    .then (answer => {
        console.log(answer.title, answer.salary, answer.department_id);
      const sql = `INSERT INTO roles (title, salary, department_id)
                   VALUES (?,?,?)`;
      const params = [answer.title, answer.salary, answer.department_id];
      query1(sql, params);
      console.log('Added ' + answer.title + ' to roles.');  
      return answer;
    })
};

// user can provide the ID of the role to delete from the database
async function deleteRole () {
  await inquirer.prompt([
    {
      type: 'input', 
      name: 'id',
      message: "Provide the ID of the role to delete?",
      validate: name => {
        if (name) {
            return true;
        } else {
            console.log('Please enter a role ID');
            return false;
        }
      }
    }
  ])
  .then(answer => {
    const sql = `DELETE FROM roles WHERE id = ?`
    const rows = query1(sql, answer.id);
    console.log('Deleted the role.');  
    return answer;
  });
};

module.exports = {showRoles, 
                  addRole,
                  deleteRole};