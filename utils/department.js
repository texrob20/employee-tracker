const db = require('../../db/connection');
const cTable = require('console.table');

showDepartments = () => {
console.log ('Departments:');
const sql = 'SELECT * FROM department';
db.promise().query(sql, (err, rows) => {
    if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
    console.table(rows);  
  })
}

addDepartment = () => {
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

module.exports = {showDepartments, addDepartment};