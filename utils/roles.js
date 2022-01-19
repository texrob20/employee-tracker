const db = require('../../db/connection');
const cTable = require('console.table');

showDepartments = () => {
console.log ('Roles:');
const sql = 'SELECT * FROM roles';
db.promise().query(sql, (err, rows) => {
    if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
    console.table(rows);  
  })
}

addRole = () => {
    inquirer.prompt ([{
        type: 'input',
        message: "Please provide the title of the new role.",
        name: 'title',
        validate: function (ans) {
            if (ans) {
                return true;
            } else {
               return console.log("Please enter a title.");
            }},
        type: 'input',
        message: "Please provide the salary of the new role.",
        name: 'salary',
        validate: function (ans) {
            if (ans) {
                return true;
            } else {
                return console.log("Please enter a salary.");
            }},
        type: 'input',
        message: "Please provide the department of the new role.",
        name: 'department',
        validate: function (ans) {
            if (ans) {
                return true;
            } else {
                return console.log("Please enter a department.");
            }}            
        }])
    .then (answer => {
      const depts = 'SELECT name, id FROM department';
      db.promise().query(depts, (err, data) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
      const dept = data.map(({ name, id }) => ({ name: name, value: id }));
      for (i=0; i<dept.length; i++){
          if (dept[i].name == answer.department){
              answer.department_id = dept[i].value;
          };
        };   
      })  
      const sql = `INSERT INTO roles (title, salary, department_id)
                 VALUES (?,?,?)`;
      db.query(sql, answer.title, answer.salaray, answer.department_id, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      console.log('Added ' + answer.title + ' to roles.');  
    })
  })
};

module.exports = {showRoles, addRole};