DROP DATABASE bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;
CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(255) NOT NULL,
  over_head_costs DECIMAL(7,2) NOT NULL DEFAULT '0.00',
  total_sales INT NOT NULL DEFAULT '0',

  PRIMARY KEY (department_id)
);

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  department_id INT NOT NULL,
  price DECIMAL(7,2) NOT NULL,
  stock INT NOT NULL DEFAULT '1' ,
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
      PRIMARY KEY (item_id)
);
 

ALTER TABLE products ADD COLUMN product_sales INT NOT NULL DEFAULT '1';

 INSERT INTO  departments (department_id,department_name,over_head_costs,total_sales)VALUES(1,"APPETIZERS",50.00 ,0),(2,"SALADS",50.00 ,0),(3,"BREAKFAST",50.00 ,0),(4,"BURGERS",50.00 ,0);
 
INSERT INTO  products (item_id,product_name,department_id,price,stock)VALUES(1,"Hummus Plate",1,5.00,5),(2,"Ezme Plate",1,6.00,6),(3,"House Salad",2,6.00,7),(4,"Cobb Salad",2 ,15.00,9),(5,"Beet Salad",2,7.00,11),(6,"Falafel Salad",2,12,9),(7,"Garden Scramble",3,12.00,10),(8,"California Omelette",3,11.00,14),(9,"Bacon Omelette",3,12.00,17),(10,"Cornerstone Burger",4,12.00,12),(11,"Nut Burger",4,12.00,12),(12,"Portabello Sandwich",4,13.00,18);

 