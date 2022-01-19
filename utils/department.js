const db = require('../db/connection');
const promise = require('mysql2/promise');
const cTable = require('console.table');
const rtn = require('../server');

async function showDepartments() {
  console.log ('Departments:');
  const sql = `SELECT department.id AS id, department.name AS department FROM department`;
  await promise (db.query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);  
    })
  )
  .then ((res) => {
    return;
  })
}
  

function addDepartment () {
  inquirer.prompt ([{
    type: 'input',
    message: "Please provide the name of the new department.",
    name: 'name',
    validate: function (ans) {
        if (ans) {
          return true;
        } else {
        return console.log("Please enter a department.");
        }}
  }])
  .then (answer => {
    const sql = `INSERT INTO department (name)
                 VALUES (?)`;
    db.query(sql, answer.name, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
    console.log('Added ' + answer.name + ' to departments.');  
    })
  })
};

module.exports = {
  showDepartments, 
  addDepartment};