const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const { table } = require('table');
const inquirer = require('inquirer');
const { text } = require('stream/consumers');


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
                    name: 'employee_role',
                    message: "What is the employees role?"
                }
            ])
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