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

module.exports = {
  showDepartments, 
  addDepartment};