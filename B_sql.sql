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

 
 

/*LOAD DATA LOCAL INFILE 'C:/Users/Harry/Bamazon-Food/Products.csv' INTO TABLE products FIELDS TERMINATED BY ',' ENCLOSED BY '"'LINES TERMINATED BY '\n';*/
 