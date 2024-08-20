import inquirer from "inquirer";
import pkg from 'pg';
const { QueryResult } = pkg;
import { connectToDb, pool } from "../connection.js";


await connectToDb();

class Departments {
    constructor() {};
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
                            console.error(error);
                        } else {
                            data.rows.forEach((department) => {
                                console.log(department);
                            });
                        }
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
