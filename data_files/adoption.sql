CREATE DATABASE pets;
USE pets;

CREATE TABLE adoptions (
	id INT AUTO_INCREMENT PRIMARY KEY,
    pet_type VARCHAR (50),
    quantity INT(4),
    color VARCHAR(50),
    date_submitted TIMESTAMP DEFAULT NOW()
);

INSERT INTO adoptions (pet_type, quantity, color)
VALUES ('dog', 1, 'black');

SELECT * FROM adoptions;