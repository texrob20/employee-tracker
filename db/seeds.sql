INSERT INTO department (name)
VALUES
  ('Sales'),
  ('Human Resources'),
  ('Research and Development'),
  ('Operations');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Sales Manager', '75000', 1),
  ('Sales Associate', '40000', 1),
  ('HR Manager', '75000', 2),
  ('HR Specialist', '45000', 2),
  ('R&D Manager', '75000', 3),
  ('R&D Engineer', '50000', 3),
  ('Operations Manager', '75000', 4),
  ('Operations Technician', '40000', 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 2, 1),
  ('Piers', 'Gaveston', 3,NULL),
  ('Charles', 'LeRoi', 4, 3),
  ('Katherine', 'Mansfield', 5, NULL),
  ('Dora', 'Carrington', 6, 5),
  ('Edward', 'Bellamy', 2, 1),
  ('Montague', 'Summers', 4, 3),
  ('Octavia', 'Butler', 7, NULL),
  ('Unica', 'Zurn', 8, 7);