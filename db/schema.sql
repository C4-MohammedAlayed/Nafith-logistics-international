
Use sql11486078;

CREATE TABLE roles(
    role_id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY Key(role_id)

);

CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    userName VARCHAR(255)NOT Null,
    email VARCHAR(255) UNIQUE Not Null,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(role_id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);