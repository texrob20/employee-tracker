const db = require('../db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');

showEmployees = () => {
console.log ('Employees:');
const sql = 'SELECT * FROM employees';
db.query(sql, (err, rows) => {
    if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
    console.table(rows);  
  })
}

addEmployee = () => {
    inquirer.prompt ([
        {
        type: 'input',
        message: "Please provide the first name of the new employee.",
        name: 'first_name',
        validate: function (ans) {
            if (ans) {
                return true;
            } else {
               return console.log("Please enter a name.");
            }}
        }, 
        {   
        type: 'input',
        message: "Please provide the last name of the new employee.",
        name: 'last_name',
        validate: function (ans) {
            if (ans) {
                return true;
            } else {
                return console.log("Please enter a name.");
            }},
        },
        {
        type: 'input',
        message: "Please provide the role ID of the new employee.",
        name: 'role-id',
        validate: function (ans) {
            if (ans) {
                return true;
            } else {
                return console.log("Please enter a role ID.");
            }},

        },
        {
        type: 'input',
        message: "Please provide the manager ID of the new employee.",
        name: 'manager_id',  
        }
      ])
    .then (answer => {
      const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                 VALUES (?,?,?,?)`;
      db.query(sql, answer.title, answer.first_name, answer.last_name, answer.role_id, answer.manager_id, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      console.log('Added ' + answer.first_name +' '+ answer.last_name + ' to roles.');  
    })
  })
};

updateEmployee = () => {
  const empSql = 'SELECT * FROM employees';
  db.promise().query(empSql, (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
  const employeeList = data.map(({ id, first_name, last_name }) => ({ first_name, last_name, value: id }));   
  const roleSql = 'SELECT * FROM roles';
  db.promise().query(roleSql, (err, rows) => {
      if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
  const roleList = data.map(({ id, title }) => ({ title, value: id }));
  inquirer.prompt([
    {
        type: 'list',
        name: 'name',
        message: "Select the employee to update",
        choices: employeeList
    },
    {
        type: 'list',
        name: 'title',
        message: "Select the employee's new title",
        choices: roleList
    }
  ])
})
  .then(answer => {
  const newRole = answer.title.value;    
  const sql = "UPDATE employee SET role_id WHERE id = ?";
  db.query(sql, newRole, (err, rows) => {
    if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
    console.log(answer.first_name + ' has been updated.');  
  });
  })
})
};

module.exports = {showEmployees, addEmployee, updateEmployee};