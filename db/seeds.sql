INSERT INTO departments (name)
VALUES ('Super Human Resources'),
       ('Fiscal Liabilities and Legal'),
       ('Anti-Crime Squad'),
       ('Uniform and Design');

INSERT INTO roles (job_title, salary, department_id)
VALUES ('Chief Super Human Resources', 100000, 1),
       ('Benefits Specialist', 80000, 1),
       ('General Counsel', 100000, 2),
       ('Director of Liabilities', 85000, 2),
       ('Director of Finance and Controller', 85000, 2),
       ('Director of Super Hero Management', 85000, 3),
       ('Young Heroes Manager', 70000, 3),
       ('The Supers and Magical Heroes Manager', 70000, 3),
       ('Rich Guys and Gadet Heroes Manager', 70000, 3),
       ('Young Hero', 100000, 3),
       ('Super Hero', 100000, 3),
       ('Rich Snob Hero', 100000, 3),
       ('Designer Extraordinaire', 90000, 4),
       ('Design Assistant', 40000, 4);

INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ('Nick', 'Fury', 6, NULL), 
       ('Professor', 'Plutonium', 7, 1),
       ('Alfred', 'Pennyworth', 8, 1),
       ('PowerPuff', 'Girls', 10, 2),
       ('Bat', 'Man', 12, 3),
       ('Agent', 'Roz', 4, NULL),
       ('Edna E', 'Mode', 13, NULL);