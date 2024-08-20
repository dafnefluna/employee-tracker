import inquirer from "inquirer";
import pkg from "pg";
const { QueryResult } = pkg;
import { pool } from "../connection.js";
import Roles from "./roles.js";
import startManaging from "../index.js";

// await connectToDb();

// try {
//     const queryResult = await pool.query(
//         "SELECT id, first_name, last_name FROM employees;"
//     );
//     newManager = queryResult.rows.map((row) => ({
//         id: row.id,
//         firstName: row.first_name,
//         lastName: row.last_name,
//     }));
// } catch (err) {
//     console.log(err);
// }

class Employees {
    allEmployees() {
        pool.query("SELECT * FROM employees;", (err, queryResult) => {
            if (err) {
                console.error(err);
            } else {
                console.log(queryResult.rows);
            }
        });
        startManaging();
    }

    returnEmployees() {
        pool.query("SELECT * FROM employees;", (err, queryResult) => {
            if (err) {
                console.error(err);
            } else {
                return queryResult.rows;
            }
        });
    }

    returnRoles() {
        pool.query('SELECT * FROM roles;', function (err, queryResult) {
            if (err) {
                console.error(err);
            } else {
                return queryResult.rows;
            }
        });
    }

    async addEmployee() {
        const newRole = this.returnRoles();
        const newRoleChoices = newRole?.map((role) => role?.job_title);
        // I have to create a function for value for employees as a list of choices

        const newManager = this.returnEmployees();
        const newManagerChoices = newManager?.map((manager) => manager?.first_name);

        console.log(".........", newRole);
        console.log("...........", newManager);
        // try {
        //     const queryResult = await pool.query("SELECT id, job_title FROM roles;");

        //     queryResult.rows.forEach((row) => {
        //         newRole.push({ id: row.id, title: row.job_title });
        //     });
        // } catch (err) {
        //     console.error(err);
        // }

        inquirer
            .prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "First Name",
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "Last Name",
                },
                {
                    type: "list",
                    name: "role",
                    message: "What is their role?",
                    choices: newRoleChoices,
                },
                {
                    type: "list",
                    name: "manager",
                    message: "Who is their manager?",
                    choices: newManagerChoices,
                },
            ])
            .then((answers) => {
                const newEmployee = {
                    firstName: answers.firstName,
                    lastName: answers.lastName,
                    role: answers.role,
                    manager: answers.manager,
                };
                pool.query(
                    "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);",
                    [
                        newEmployee.firstName,
                        newEmployee.lastName,
                        newEmployee.role,
                        newEmployee.manager,
                    ],
                    function (error, data) {
                        if (error) {
                            console.log("Error: ", error);
                        } else {
                            console.log("New employee added successfully.");
                        }
                    }
                );
            });
    }

    // find a way to show all the roles from roles.js
    // Find a way to show all the employees from the function above.

    updateEmployee() {
        // const employees = this.allEmployees();
        // console.log('...........', employees);

        inquirer
            .prompt([
                {
                    type: "list",
                    name: "updateEmployee",
                    message: "Which employee would you like to update?",
                    choices: newManager.map((employee) => ({
                        name: `${employee.firstName} ${employee.lastName}`,
                        value: employee.id,
                    })),
                },
                {
                    type: "list",
                    name: "updatedRole",
                    message: "Please select the new role",
                    choices: newRole.map((role) => ({
                        name: role.title,
                        value: role.id,
                    })),
                },
            ])
            .then((answers) => {
                console.log(answers);

                const employeeId = answers.updateEmployee;
                const newRoleId = answers.updatedRole;

                pool.query(
                    "UPDATE employees SET role_id = $1 WHERE id = $2",
                    [newRoleId, employeeId],
                    function (error, data) {
                        if (error) {
                            console.log("Error: ", error);
                        } else {
                            console.log("Employee role updated successfully.");
                        }
                    }
                );
            });
    }
}

export default Employees;
