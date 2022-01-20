const inquirer = require('inquirer');
const db = require('../db/connection');
const util = require('util');
const cTable = require('console.table');
// node native promisify
const query1 = util.promisify(db.query).bind(db);

async function showRoles() {
console.log ('Roles:\n');
try {
  const sql = 'SELECT * FROM roles';
  const rows = await query1(sql);
  console.table(rows);  
  console.log(' ');
  } finally {
    return true;
  }
}  

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

module.exports = {showRoles, addRole};