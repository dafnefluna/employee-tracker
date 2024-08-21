import inquirer from "inquirer";
import pkg from "pg";
const { QueryResult } = pkg;
import {connectToDb, pool } from "../connection.js";
import Roles from "./roles.js";
import startManaging from "../index.js";

await connectToDb();

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
                //console.log(queryResult.rows);
                console.table(queryResult.rows);
            }
        });
        startManaging();
    }

    returnEmployees() {
        return new Promise((resolve, reject) => {
            let employeesArray = [];
            pool.query("SELECT * FROM employees;", (err, queryResult) => {
                if (err) {
                    console.error(err);
                    reject(err); // Reject the promise if there is an error
                } else {
                    employeesArray = queryResult.rows;
                    resolve(employeesArray); // Resolve the promise with the employees array
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
                    reject(err); // Reject the promise if there is an error
                } else {
                    rolesArray = queryResult.rows;
                    resolve(rolesArray); // Resolve the promise with the employees array
                }
            });
        });

        /*
        let rolesArray = [];
        pool.query("SELECT * FROM roles;", function (err, queryResult){
            if (err) {
                console.error(err);
            } else {
                //console.log("Roles: ", queryResult)
                rolesArray = queryResult.rows;
                //return rolesArray = queryResult.rows;
                return rolesArray;
            }
        });
        */
       // console.log("Roles: ", queryResult) // --> This console.log() is OUTSIDE of the callback function scope

    }
    
    async addEmployee() {
        const newRole = await this.returnRoles();
        // console.log("In Employee --> Roles returned: ", newRole);
        const newRoleChoices = newRole?.map((role) => {
            return {
                name: role.job_title,
                value: role.id
            }
        })
        // I have to create a function for value for employees as a list of choices
        //console.log("Role Choices: ", newRoleChoices);

        const newManager = await this.returnEmployees();
        const newManagerChoices = newManager?.map((manager) => {
           // console.log("Data: ", manager);
            // we are using the INQUIRER "choices" setup { name: "what does the user see when making a selection", value: ID of the choosen Record}
            let tempObj = {
                name: `${manager.first_name} ${manager.last_name}`,
                value: manager.id
            }      
            
            return tempObj
        });

        // console.log(".........", newRole);
        //console.log("...........", newManagerChoices);

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
                console.log("New Employee: ", newEmployee);

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
  // const employees = this.allEmployees();
        // console.log('...........', employees);
    updateEmployee() {
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
