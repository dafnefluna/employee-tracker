import inquirer from "inquirer";
import pkg from "pg";
const { QueryResult } = pkg;
import { connectToDb, pool } from "../connection.js";
import startManaging from "../index.js";

await connectToDb();

class Departments {
    allDepartments() {
        pool.query("SELECT * FROM departments;", (err, queryResult) => {
            if (err) {
                console.error(err);
            } else {
                console.table(queryResult.rows);
            }
        });
        startManaging();
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
                    async function (error, data) {
                        if (error) {
                            console.log("Error", error);
                        } else {
                            console.log("New Department Added");
                            await startManaging();
                        }
                    }
                );
            });
    }
}

export default Departments;
