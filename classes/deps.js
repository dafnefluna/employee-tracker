// we bring in required libraries and files -->
import inquirer from "inquirer";
//const inquirer = require('inquirer');
import { connectToDb, pool } from "./connection";
// We need to create our CONNECTION to the Database

await connectToDb();

class Departments {
    allDepartments() {
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "allDepartments",
                    message: "View All Departments",
                    choices: ["View All Departments"],
                },
            ])
            .then((answers) => {
                if (answers.allDepartments === "View All Departments") {
                    pool.query("SELECT * FROM departments;", function (error, data) {
                        if (error) {
                            console.log("err: ", error);
                            return;
                        }
                        console.log("Data: ", data);
                    });
                }
            });
    }

    addDepartment() {
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "departmentName",
                    message: "What is the new Department Name",
                },
            ])
            .then((answers) => {
                const newDepartment = { departmentName: answers.departmentName };
                pool.query(
                    "INSERT INTO departments (name) VALUES ($1);",
                    [newDepartment.departmentName],
                    (error, data) => {
                        if (error) {
                            console.log("Error: ", error);
                        } else {
                            console.log("New Department Added");
                        }
                    }
                );
            });
    }
}

export default Departments;
