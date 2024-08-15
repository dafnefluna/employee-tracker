DROP DATABASE IF EXISTS employees_tracker.db;
CREATE DATABASE employees_tracker.db;

\c employees_tracker.db;

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250)

);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    job_title VARCHAR(250),
    salary INTEGER,
    department_id INTEGER 
    FOREIGN KEY (department_id) 
    REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    manager VARCHAR(100),
    role_id INTEGER 
    FOREIGN KEY(role_id)
    REFERENCES roles(id) ON DELETE SET NULL
);



