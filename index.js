const inquirer = require("inquirer");
const mysql2 = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// middleware?
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql2.createConnection(
    {
        host: 'localhost',

        user: 'root',
    
        password: 'Smeghead@77',
        database: 'employee_tracker_patrick_db'
      },
      console.log(`Connected to the employee_tracker_patrick_db database.`)
) 

const init = () => {
inquirer
.prompt([
    {
        type: "list",
        message: "Please choose an option:",
        name: "intialize",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "View a role",
            "View an employee",
            "Update an employee role",
            "I'm finished"
        ]
    }
    // add .then
]).then(answers => {

})

}
// add function
const viewDept = () => {
    db.query(`SELECT * FROM department`, (err, results) => {
        err ? console.error(err) : console.table(results);
        init();
    })
}
// add function
const viewrole = () => {
    db.query(`SELECT * FROM role`, (err, results) => {
        err ? console.error(err) : console.table(results);
        init();
    })
    
}
// add function
const viewEmployee = () => {
    db.query(`SELECT * FROM employee`, (err, results) => {
        err ? console.error(err) : console.tables(results);
        init();
    })
}

const addDept = () => {
    inquirer
    .prompt([
        {
            type: "input",
            message: "What department would you like to add?",
            name:"addDept"
        }

    ]).then(answers => {
        db.query(`INSERT INTO department(name)
        VALUES(?)`, answers.addDept, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                db.query(`SELECT * FROM department`, (err, results) => {
                    err ? console.error(err) : console.table(results);
                    init();
                })
            }
        })
    })
};
const addRole = () => {
    inquirer
    .prompt([
        {
            type: "input",
            message: "What role would you like to add?",
            name:"title"
        },
        {
            type: "input",
            message: "What is the salary for this role?",
            name:"salary"
        },
        {
            type: "input",
            message: "What department is this role assigned?",
            name:"addDept",
            // connect to departments
            choices: 
            

        }

        // add .then
    ]).then(answers => {

    })
}


const addEmployee = () => {
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the first name of the employee would you like to add?",
            name:"firstName"
        },
        {
            type: "input",
            message: "What is the last name of the employee would you like to add?",
            name:"lastName"
        },
        {
            type: "input",
            message: "What is this employees role?",
            name:"role"
        },
        {
            type: "input",
            message: "Who is the manager of thid employee?",
            name: "manager"
        }

        // add .then
    ]).then(answers => {

    })
}

init();
    



