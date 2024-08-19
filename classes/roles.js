import inquirer from "inquirer";
import { connectToDb, pool } from "./connection";
import allDepartments from "./deps";

await connectToDb();
const departments = await allDepartments();
const departmentChoices = departments.map((dept) => dept.name);

class Roles {
    allRoles() {
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "allRoles",
                    message: "View All Roles",
                    choices: ["View All Roles"],
                },
            ])
            .then((answers) => {
                if (answers.allRoles === "View All Roles") {
                    pool.query("SELECT * FROM roles;", function (error, data) {
                        if (error) {
                            console.log("err: ", error);
                            return;
                        }
                        console.log("Data: ", data);
                    });
                }
            });
    }

    addRole() {
        inquirer
            .prompt([
                {
                    type: "input",
                    name: "jobTitle",
                    message: "What is the job title?",
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the salary?",
                },
                {
                    type: "list",
                    name: "department",
                    message: "What department is it in?",
                    choices: departmentChoices,
                },
            ])
            .then((answers) => {
                const newRole = {
                    jobTitle: answers.jobTitle,
                    salary: answers.salary,
                    department: answers.department,
                };
                pool.query(
                    "INSERT INTO roles (job_title, salary, department_id) VALUES ($1, $2, $3);",
                    [newRole.jobTitle, newRole.salary, newRole.deparment],
                    function (error, data) {
                        if (error) {
                            console.log("Error", error);
                        } else {
                            console.log("New Role Added");
                        }
                    }
                );
            });
    }
}

export default Roles;