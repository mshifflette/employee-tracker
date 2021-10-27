const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const { table } = require('table');
const inquirer = require('inquirer');
const e = require('express');



const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // Add MySQL password here
    password: 'password',
    database: 'mycompany_db'
  },
  console.log(`Connected to the mycompany_db database.`)
);

function init(){
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices:[
               "View All Employees",
               "Add Employee",
               "Update Employee Role",
               "View All Roles",
               "Add Role",
               "View All Departments",
               "Add Department",
               "Quit"
            ]


        }
    ])
    .then((ans) => {
        if(ans.choice === "View All Employees"){
            db.query('SELECT employees.id,employees.first_name,employees.last_name, role.title, role.salary, employees.manager_id FROM Employees INNER JOIN role ON employees.role_id = role.id', function (err, results) {
                console.table(results);
                init();
              });
        }
        else if (ans.choice === "Add Employee"){
            inquirer.prompt([
                {
                    type: "text",
                    name: "first_name",
                    message:"What is the employees first name?"
                },
                {
                    type: 'text',
                    name: 'last_name',
                    message: "What is the employees last name?"
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: "What is the employees role?",
                    choices:[
                    {
                        name: "Sales Lead",
                        value: 1
                    },
                    {
                        name: "Sales Person",
                        value: 2
                    },
                    {
                        name: "Lead Engineer",
                        value: 3
                    },          
                    {
                        name: "Software Engineer",
                        value: 4
                    },
                    {
                        name: "Account Manager",
                        value: 5
                    },
                    {
                        name: "Accountant",
                        value: 6
                    },
                    {
                        name: "Legal Team Lead",
                        value: 7
                    },
                    {
                        name: "Lawyer",
                        value: 8
                    }
                    ]
                },
                {
                    type: 'list',
                    name:'manager_id',
                    message: "Who is the employee's manager",
                    choices: [
                        {   
                            name: "none",
                            value: null
                        },
                        {
                            name: "John Doe",
                            value: 1
                        },
                        {
                            name: "Ashley Rodriguez",
                            value: 3
                        },
                        {
                            name: "Kunal Singh",
                            value: 5
                        },
                        {
                            name:"Sarah Lourd",
                            value: 7
                        }
                    ]
                }
            ]).then((ans) => {
                db.query('INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)',[ans.first_name,ans.last_name,ans.role_id, ans.manager_id], function (err, results) {
                    if (err) throw err;
                    console.log("Employee Added!");
                    init();
                  });
            });
        }
        else if (ans.choice === "View All Departments"){
            db.query('SELECT * FROM department', function (err, results) {
                if (err) throw err;
                console.table(results);
                init();
              });
        }
        else if(ans.choice === "Add Department"){
            inquirer.prompt(
                {
                    type: "text",
                    name: "name",
                    message:"What is the Department name?"
                }).then((ans) => {
                db.query('INSERT INTO department (name) VALUES (?)',[ans.name], function (err, results) {
                    if (err) throw err;
                    console.log("Departemt Added!");
                    init();
                });
            });
        }
        else if (ans.choice === "View All Roles") {
            db.query('SELECT title, salary FROM role', function (err, results) {
                if (err) throw err;
                console.table(results);
                init();
              });
        }
        else if (ans.choice === "Add Role"){
            inquirer.prompt([
                {
                    type: "text",
                    name: "title",
                    message:"What is the name of the role?"
                },
                {
                    type: "text",
                    name: "salary",
                    message:"What is the salary of the role?"
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Which department does the role belong to?",
                    choices: [
                        {
                            name: "Sales",
                            value: 1
                        },
                        {
                            name: "Engineering",
                            value: 2
                        },
                        {
                            name: "Finance",
                            value: 3
                        },
                        {
                            name: "Legal",
                            value: 4
                        }
                    ]
                }
            ]).then((ans) => {
                db.query('INSERT INTO role (title,salary,department_id) VALUES (?,?,?)',[ans.title, ans.salary, ans.department_id], function (err, results) {
                    if (err) throw err;
                    console.log("Role Added!");
                    init();
                });
            });
        }
        else if (ans.choice === "Update Employee Role"){
            
        }
     })
    .catch((error) => {
        console.log(error)
    });
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
init();