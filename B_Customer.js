require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

 
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "345876",
  database: "bamazon_db"
});


 
connection.connect(function(err) {
  if (err) throw err;

  Show_Products();

});

 
var Show_Products = function() {
	var query = "Select item_id,product_name,department_name,price,stock from products lef join departments using (department_id)";
	connection.query(query, function(err, res) {

		if (err) throw err; 
		console.log("=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*= Bamazon Food =*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*==*=*=*=*=*=*=*=*=*=*=")
        console.table(res);
  		Call_Product();
	});
};

 
var Call_Product = function() {
	inquirer.prompt([{
		name: "productID",
		type: "input",
		message: "Please enter product ID for product you want.",
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
			return false;
		}
	}, {
		name: "productUnits",
		type: "input",
		message: "How many units do you want?",
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			}
			return false
		}
	},]).then(function(answer) {

 
		var query = "Select stock, price, product_sales, department_id FROM products WHERE ?";
		connection.query(query, { item_id: answer.productID}, function(err, res) {
			
			if (err) throw err;

			var available_stock = res[0].stock;
			var price_per_unit = res[0].price;
			var productSales = res[0].product_sales;
			var productDepartment = res[0].department_id;

		 
			if (available_stock >= answer.productUnits) {
				
				completePurchase(available_stock, price_per_unit, productSales, productDepartment, answer.productID, answer.productUnits);
			} else {

				console.log("There isn't enough stock left!");

				Call_Product();
			}
		});
	});
};


 
var completePurchase = function(availableStock, price, productSales, productDepartment, selectedProductID, selectedProductUnits) {
	
 
	var updatedStockQuantity = availableStock - selectedProductUnits;

	 
	var totalPrice = price * selectedProductUnits;

 
	var updatedProductSales = parseInt(productSales) + parseInt(totalPrice);
	
 
	var query = "UPDATE products SET ? WHERE ?";
	connection.query(query, [{
		stock: updatedStockQuantity,
		product_sales: updatedProductSales
	}, {
		item_id: selectedProductID
	}], function(err, res) {

		if (err) throw err;
	 
		console.log("Your purchase is complete.");

	 
		console.log("You payment has been received in the amount of : " + totalPrice);

	 
		updateDepartmentRevenue(updatedProductSales, productDepartment);
		 
	});
};

 

var updateDepartmentRevenue = function(updatedProductSales, productDepartment) {

	 
	var query = "Select total_sales FROM departments WHERE ?";
	connection.query(query, { department_id:productDepartment}, function(err, res) {

		if (err) throw err;

		var departmentSales = res[0].total_sales;

		var updatedDepartmentSales = parseInt(departmentSales) + parseInt(updatedProductSales);

		 
		completeDepartmentSalesUpdate(updatedDepartmentSales, productDepartment);
	});
};



var completeDepartmentSalesUpdate = function(updatedDepartmentSales, productDepartment) {

	var query = "UPDATE departments SET ? WHERE ?";
	connection.query(query, [{
		total_sales: updatedDepartmentSales
	}, {
		department_name: productDepartment
	}], function(err, res) {

		if (err) throw err;
		Show_Products();
	});
};
