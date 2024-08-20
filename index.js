import inquirer from 'inquirer';
import { connectToDb } from './connection.js';
import Employees from './classes/employees.js';
import Roles from './classes/roles.js';
import Departments from './classes/deps.js';

async function startManaging() {
    await connectToDb();

    const employees = new Employees();
    const roles = new Roles();
    const departments = new Departments();

    while (true) {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'managingOptions',
                message: 'What would you like to do?',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Exit'],
            },
        ]);

        switch (answers.managingOptions) {
            case 'View All Employees':
                await employees.allEmployees();
                break;
            case 'Add Employee':
                await employees.addEmployee();
                break;
            case 'Update Employee Role':
                await employees.updateEmployee();
                break;
            case 'View All Roles':
                await roles.allRoles();
                break;
            case 'Add Role':
                await roles.addRole();
                break;
            case 'View All Departments':
                await departments.allDepartments();
                break;
            case 'Add Department':
                await departments.addDepartment();
                break;
            case 'Exit':
                console.log('Exiting application');
                return;
        }
    }
}

startManaging();