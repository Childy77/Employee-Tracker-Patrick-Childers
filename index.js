const inquirer = require("inquirer");
const mysql2 = require("mysql2");
require("dotenv").config();

// const PORT = process.env.PORT || 3001;
// const app = express();

// middleware?
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const db = mysql2.createConnection(
    {
        host: 'localhost',

        user: process.env.DB_USER,
    
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
      console.log(`Connected to the employee_tracker_patrick_db database.`)
) 

const init = () => {
inquirer
.prompt([
    {
        type: "list",
        message: "Please choose an option:",
        name: "initialize",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee role",
            "I'm finished"
        ]
    }
    // add .then
]).then(answers => {
    switch (answers.initialize) {
        case "View all departments": viewDept();
            break;
        case "View all roles": viewRole();
            break;
        case "View all employees": viewEmployee();
            break;
        case "Add a department": addDept();
            break;
        case "Add a role": addRole();
            break;
        case "Add an employee": addEmployee();
            break;
        case "Update an employee role": updateEmployee();
            break;
        case "I'm finished": exitPrompt();
            console.log("Thank you very much!");
            
    }
}).catch(err => console.error(err));

}

// add function
const viewDept = () => {
    db.query(`SELECT * FROM department`, (err, results) => {
        err ? console.error(err) : console.table(results);
        init();
    })
}
// add function
const viewRole = () => {
    db.query(`SELECT *, department.department_name FROM role left join department on role.department_id = department.id`, (err, results) => {
        err ? console.error(err) : console.table(results);
        init();
    })
    
}
// add function
const viewEmployee = () => {
    db.query(`SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department_name, manager.last_name as manager FROM employee left join role on employee.role_id = role.id left join department on role.department_id = department.id left join employee manager on employee.manager_id = manager.id`, (err, results) => {
        err ? console.error(err) : console.table(results);
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
        db.query(`INSERT INTO department(department_name)
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
    
    db.promise().query(`SELECT * FROM department`)
    .then((rows) => {
         let arrNames = rows[0].map(obj => ({name: obj.department_name, value:obj.id}));
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
                 type: "list",
                 message: "What department is this role assigned?",
                 name:"department_id",
                 // connect to departments
                 choices: arrNames
                 
     
             }
     
             // add .then
         ]).then(answers => {
             db.promise().query("INSERT INTO role set ?", answers).then(data => {
                 console.log("added role");
                 init()
             })
         })
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
            message: "Who is the manager of this employee?",
            name: "manager"
        }

        // add .then
    ]).then(answers => {
        db.query(`INSERT INTO employee(first_name, last_name)
        VALUES(?, ?)`, [answers.firstName, answers.lastName], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                db.query(`SELECT * FROM employee`, (err, results) => {
                    err ? console.error(err) : console.table(results);
                    
                    init();
                })
            }
        })
    })
}

const updateEmployee = () => {
    db.query(
        `SELECT * FROM role`,
        function (err, res) {
            if (err) throw err;
            const roles = res;
            console.table(roles);

            inquirer
            .prompt([
                {
                    type: "input",
                    message: "Enter employee ID number",
                    name: "role_id"
                },
                {
                    type: "input",
                    message: "choose new employee role",
                    name: "roles"
                }
            ]).then(answers => {
                db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [answers.role_id, answers.roles], (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        db.query(`SELECT * FROM employee`, (err, results) => {
                            err ? console.error(err) : console.table(results);

                            init();
                        } )
                    }
                })
            })
        }

    )
    
    }
   

const exitPrompt = () => {
console.log("Thank you very much!");
}

init();
    



