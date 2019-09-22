# Bamazon-Food

*******************Bamazon Foood Node js Application*********************

Video Link
https://drive.google.com/open?id=1ZGUHmSUdP0oDqsotuEBgmo-DtVGEsq93

Third-party Node Modules
-------------------------------------------------------------------------------------------------------------------------------------------
Bamazon Food uses these node modules;

--> nmp install

--> nmp i mysql

--> nmp i inquirer

--> npm i console.table

--> npm i fast-csv



Customer Module
-------------------------------------------------------------------------------------------------------------------------------------------
The customer module lets users select a product to purchase, enter the number of items they wish to purchase, and then complete the purchase.

The complete purchase process shows how much the total cost is (based on number of items).

The customer module also updates to the total sales for a department, based on the purchased product's department.

To run this module in the terminal:

node B_Customer.js


Manager Module
-------------------------------------------------------------------------------------------------------------------------------------------
The manager module lets managers view the list of products, view low inventory, add inventory, and add products.

As part of adding a product, if the department doesn't exist, it will get added automatically, so the manager doesn't have to worry about it.

New products and new departments appear in the products and departments tables.

To run this module in the terminal:

node B_Manager.js

Supervisor Module
-------------------------------------------------------------------------------------------------------------------------------------------
The supervisor module lets supervisors view product sales by departments and add new departments.

The product sales are displayed in the terminal using the console.table node module, so it looks pretty.

The table also uses mysql aliases to also include an on-the-fly calculated total sales for a department, which is the product sales minus the overhead.

To run this module in the terminal:

node B_Supervisor.js