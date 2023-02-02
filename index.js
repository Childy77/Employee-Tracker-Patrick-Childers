const inquirer = require("inquirer");
const mysql2 = require("mysql2");

const db = mysql2.createConnection(
    {
        host: 'localhost',

        user: 'root',
    
        password: 'Smeghead@77',
        database: 'employee_tracker_patrick_db'
      },
      console.log(`Connected to the employee_tracker_patrick_db database.`)
)

function init() 


    inquirer
    .prompt([])



