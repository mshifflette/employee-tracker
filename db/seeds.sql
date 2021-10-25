INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title,salary,department_id)
VALUES ("Sales Lead",110000.00,1),
       ("Sales Person",80000.00,1),
       ("Lead Engineer",250000.00,2),
       ("Software Engineer",150000.00,2),
       ("Account Manager",116000,3),
       ("Accountant",100000,3),
       ("Legal Team Lead",300000,4),
       ("Lawyer",250000,4);

INSERT INTO employees (first_name,last_name,role_id,manager_id)
VALUES  ("John", "Doe", 1, NULL),
        ("Mike", "Chan", 2, 1),
        ("Ashley", "Rodriguez", 3,NULL),
        ("Kevin", "Tupik", 4,3),
        ("Kunal", "Singh", 5, NULL),
        ("Malia", "Brown", 6,5),
        ("Sarah", "Lourd", 7, NULL),
        ("Tom", "Allen", 8,7);