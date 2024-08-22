import inquirer from 'inquirer';
import pkg from "pg";
const { QueryResult } = pkg;
import { connectToDb, pool } from '../connection.js';
import startManaging from '../index.js';

await connectToDb();

class Roles {
    allRoles() {
        pool.query('SELECT * FROM roles;', (err, queryResult) => {
            if (err) {
                console.error(err);
            } else {
                console.table(queryResult.rows);
            }
        });
        startManaging();
    }

    async returnDepartments() {
        return new Promise((resolve, reject) => {
            let departmentsArray = [];
            pool.query("SELECT * FROM departments;", (err, queryResult) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    departmentsArray = queryResult.rows;
                    resolve(departmentsArray);
                }
            });
        });
    }

    async addRole() {
        const newDepartment = await this.returnDepartments();
        // console.log("In Employee --> Roles returned: ", newRole);
        const newDepartmentChoices = newDepartment?.map((department) => {
            return {
                name: department.name,
                value: department.id,
            };
        });
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'jobTitle',
                    message: 'What is the job title?',
                },
                {
                    type: 'input',
                    name: 'salary',
                    message: 'What is the salary?',
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'What department is it in?',
                    choices: newDepartmentChoices,
                },
            ])
            .then((answers) => {
                const newRole = {
                    jobTitle: answers.jobTitle,
                    salary: answers.salary,
                    department: answers.department,
                };
                pool.query(
                    'INSERT INTO roles (job_title, salary, department_id) VALUES ($1, $2, $3);',
                    [newRole.jobTitle, newRole.salary, newRole.department],
                    async function (error, data) {
                        if (error) {
                            console.log('Error', error);
                        } else {
                            console.log('New Role Added');
                            await startManaging();
                        }
                    }
                );
            });
    }
}

export default Roles;
