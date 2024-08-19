import inquirer from 'inquirer';
// import { QueryResult } from 'pg';
import {connectToDb, pool } from './connection.js';
import Employees from './classes/employees.js';
import Roles from './classes/roles.js';
import Departments from './classes/deps.js';


await connectToDb();

  allEmployees = Employees.allEmployees();
  addEmployee = Employees.addEmployee();
  updateEmployee = Employees.updateEmployee();
  allRoles = Roles.allRoles();
  addRole = Roles.addRole();
  allDepartments = Departments.allDepartments();
  addDepartment = Departments.addDepartment();
  exit = false;

function startManaging() {
  inquirer
      .prompt([
      {
          type: 'list',
          name: 'managingOptions',
          message: 'What would you like to do?',
          choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Exit'],
      },
  ])
      .then((answers) => {
      if (answers.allEmployees === 'View All Employees') {
          this.allEmployees();
          return;
      } else if (answers.addEmployee === 'Add Employee') {
          this.addEmployee();
          return;
      } else if (answers.updateEmployee === 'Update Employee Role') {
        this.updateEmployee();
        return;
      } else if (answers.allRoles === 'View All Roles') {
        this.allRoles();
        return;
      } else if (answers.addRole === 'Add Role') {
        this.addRole();
        return;
      } else if ( answers.allDepartments === 'View All Departments') {
        this.allDepartments();
        return;
      } else if (answers.addDepartment === 'Add Department') {
        this.addDepartment();
        return;
      } else if (answers.exit === 'Exit') {
        this.exit() = true;
      }
      //  else (!this.exit);
      //   this.startManaging();
      })
    }

    startManaging();