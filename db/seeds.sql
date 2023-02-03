INSERT INTO department(department_name)
    VALUES  ("Sales"),
            ("Marketing"),
            ("Legal"),
            ("Management"),
            ("Engineering");
           
INSERT INTO roles(title, salary, department_id)
    VALUES  ("Saleperson", 40000, 1),
            ("Marketing Team Lead", 50000, 2),
            ("Legal Team Lead", 60000, 3),
            ("Lawyer", 700000, 3),
            ("Team Manager", 800000, 4),
            ("Engineer", 90000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)  
    VALUES  ("Stan", "Smith", 1, 6),         
            ("Dan", "Brown", 2, 7),         
            ("Julius", "Caeser", 3, 8),         
            ("George", "Gordon", 4, 9),         
            ("Kyle", "Williams", 5, 10),         
            ("Steve", "Howard", 6, 10);         