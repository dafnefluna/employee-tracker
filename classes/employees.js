// we bring in required libraries and files --> 
import inquirer from 'inquirer';
import { QueryResult } from 'pg';
//const inquirer = require('inquirer');
import {connectToDb, pool } from './connection.js';
// We need to create our CONNECTION to the Database

await connectToDb();

let newManager = [];
pool.query('SELECT id, first_name, last_name FROM employees;', function(err, queryResult) {
    if (err) {
        console.log(err);
    } else {
        newManager = queryResult.rows.map(row => ({ id: row.id, firstName: row.first_name, lastName: row.last_name }));
        console.log('                   ', newManager)
    }
});

const newRole = [];
pool.query('SELECT id, job_title FROM roles;', (err, queryResult) => {
    if (err) {
        console.error(err);
    } else {
        queryResult.rows.forEach(row => {
            newRole.push({ id: row.id, title: row.job_title });
        });
        console.log('                ', newRole)
    }
});


class Employees {
    
allEmployees() {
inquirer
    .prompt([
        {
            type: 'list',
            name: 'allEmployees',
            message: 'View All Employees',
            choices: ['View All Employees']
        }
    ])
    .then((answers) => {
        if (answers.allEmployees === 'View All Employees') {
            pool.query('SELECT * FROM employees;', (err, queryResult) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(queryResult.rows);
                }
            });
        }
    });}
    
addEmployee() {
inquirer
    .prompt ([
    {
        type: 'input',
        name: 'firstName',
        message: 'First Name',
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Last Name',
    },
    {
        type: 'list',
        name: 'role',
        message: 'What is their role?',
        choices: newRole,
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Who is their manager?',
        choices: newManager,
    }
    ])
    .then((answers) => {
        const newEmployee = {
            firstName: answers.firstName, 
            lastName: answers.lastName, 
            role: answers.role, 
            manager: answers.manager};
    pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);',
            [newEmployee.firstName, newEmployee.lastName, newEmployee.role, newEmployee.manager],
            function(error, data) {
                if (error) {
                    console.log("Error: ", error);
                } else {
                    console.log("New employee added successfully.");
                }
            });
});
}

//help here with the id please 
updateEmployee() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'updateEmployee',
                message: 'Which employee would you like to update?',
                choices: newManager.map(employee => ({
                    name: `${employee.firstName} ${employee.lastName}`,
                    value: employee.id
                }))
            },
            {
                type: 'list',
                name: 'updatedRole',
                message: 'Please select the new role',
                choices: newRole.map(role => ({
                    name: role.title,
                    value: role.id
                }))
            }
        ])
        .then((answers) => {
            console.log(answers);

            const employeeId = answers.updateEmployee;
            const newRoleId = answers.updatedRole;

            pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [newRoleId, employeeId], function(error, data) {
                if (error) {
                    console.log("Error: ", error);
                } else {
                    console.log("Employee role updated successfully.");
                }
            });
        });

}
}

export default Employees;
