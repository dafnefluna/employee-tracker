import inquirer from 'inquirer';
import { QueryResult } from 'pg';
import {connectToDb, pool } from './connection.js';
import Employees from './classes/employees.js';
import Roles from './classes/roles.js';
import Departments from './classes/deps.js';


await connectToDb();

class managing {
startManaging() {
  inquirer
      .prompt([
      {
          type: 'list',
          name: 'managingOptions',
          message: 'What would you like to do?',
          choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department'],
      },
  ])
      .then((answers) => {
      if (answers.allEmployees === 'View All Employees') {
          this.allEmployees();
      } else if (answers.addEmployee === 'Add Employee') {
          this.addEmployee();
      } else if (answers.updateEmployee === 'Update Employee Role') {
        this.updateEmployee();
      } else if (answers.allRoles === 'View All Roles') {
        this.allRoles();
      } else if (answers.addRole === 'Add Role') {
        this.addRole();
      } else if ( answers.allDepartments === 'View All Departments') {
        this.allDepartments();
      } else (answers.addDepartment === 'Add Department'); {
      this.addDepartment() 
      }
  });
}
}
