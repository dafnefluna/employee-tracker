\c postgres

DROP DATABASE IF EXISTS employees_tracker_db;
CREATE DATABASE employees_tracker_db;

\c employees_tracker_db;

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)

);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    job_title VARCHAR(100),
    salary INTEGER,
    department_id INTEGER, 
    FOREIGN KEY (department_id) 
    REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    roles_id INTEGER, 
    FOREIGN KEY(roles_id)
    REFERENCES roles(id) ON DELETE SET NULL,
    manager_id INTEGER,
    FOREIGN KEY(manager_id)
    REFERENCES employees(id) ON DELETE SET NULL
);



