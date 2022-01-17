const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all candidates
router.get('/employees', (req, res) => {
    const sql = `SELECT employees.*, roles.title, roles.salary 
             AS role_name, salary 
             FROM employees 
             LEFT JOIN roles 
             ON employees.roles_id = roles.id`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

// Get a single candidate
router.get('/employee/:id', (req, res) => {
    const sql = `SELECT employees.*, roles.name, roles.salary 
             AS role_name, salary 
             FROM employees 
             LEFT JOIN roless 
             ON employees.roles_id = roles.id 
             WHERE employee.id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });

// Delete a candidate
router.delete('/employee/:id', (req, res) => {
    const sql = `DELETE FROM employees WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });

// Create a candidate
router.post('/employee', ({ body }, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
    const sql = `INSERT INTO employees (first_name, last_name, manager_id)
  VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.manager_id];

    db.query(sql, params, (err, result) => {
      if (err) {
       res.status(400).json({ error: err.message });
      return;
    }
    res.json({
    message: 'success',
    data: body
    });
  });
});

// Update a candidate's party
router.put('/employee/:id', (req, res) => {
    const errors = inputCheck(req.body, 'role_id');
    if (errors) {
    res.status(400).json({ error: errors });
    return;
    }
    const sql = `UPDATE employees SET role_id = ? 
                 WHERE id = ?`;
    const params = [req.body.party_id, req.params.id];
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        // check if a record was found
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
  });

module.exports = router;