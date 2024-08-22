import inquirer from "inquirer";
import pkg from "pg";
const { QueryResult } = pkg;
import { connectToDb, pool } from "../connection.js";
import startManaging from "../index.js";

await connectToDb();

class Employees {
    allEmployees() {
        pool.query("SELECT * FROM employees;", (err, queryResult) => {
            if (err) {
                console.error(err);
            } else {
                //console.log(queryResult.rows);
                console.table(queryResult.rows);
            }
        });
        startManaging();
    }

    async returnEmployees() {
        return new Promise((resolve, reject) => {
            let employeesArray = [];
            pool.query("SELECT * FROM employees;", (err, queryResult) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    employeesArray = queryResult.rows;
                    resolve(employeesArray);
                }
            });
        });
    }

    returnRoles() {
        return new Promise((resolve, reject) => {
            let rolesArray = [];
            pool.query("SELECT * FROM roles;", (err, queryResult) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    rolesArray = queryResult.rows;
                    resolve(rolesArray);
                }
            });
        });
    }

    async addEmployee() {
        const newRole = await this.returnRoles();
        // console.log("In Employee --> Roles returned: ", newRole);
        const newRoleChoices = newRole?.map((role) => {
            return {
                name: role.job_title,
                value: role.id,
            };
        });
        // I have to create a function for value for employees as a list of choices
        //console.log("Role Choices: ", newRoleChoices);

        const newManager = await this.returnEmployees();
        const newManagerChoices = newManager?.map((manager) => {
            let tempObj = {
                name: `${manager.first_name} ${manager.last_name}`,
                value: manager.id,
            };
            return tempObj;
        });

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
                    "INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES ($1, $2, $3, $4);",
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
            startManaging();
    }

    async updateEmployee() {
        const newManager = await this.returnEmployees();
        const newManagerChoices = newManager?.map((manager) => {
            let tempObj = {
                name: `${manager.first_name} ${manager.last_name}`,
                value: manager.id,
            };
            return tempObj;
        });

        const newRole = await this.returnRoles();
        // console.log("In Employee --> Roles returned: ", newRole);
        const newRoleChoices = newRole?.map((role) => {
            return {
                name: role.job_title,
                value: role.id,
            };
        });
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "updateEmployee",
                    message: "Which employee would you like to update?",
                    choices: newManagerChoices,
                },
                {
                    type: "list",
                    name: "updatedRole",
                    message: "Please select the new role",
                    choices: newRoleChoices,
                },
            ])
            .then((answers) => {
                console.log(answers);
                const employeeId = answers.updateEmployee;
                const newRoleId = answers.updatedRole;

                pool.query(
                    "UPDATE employees SET roles_id = $1 WHERE id = $2",
                    [newRoleId, employeeId],
                    async function (error, data) {
                        if (error) {
                            console.log("Error: ", error);
                        } else {
                            console.log("Employee role updated successfully.");
                            await startManaging();
                        }
                    }
                );
            });
    }
}

export default Employees;
