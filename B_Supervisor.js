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
  selectAction();

});


var selectAction = function() {
	inquirer.prompt([
	{
		type: 'list',
		name: 'action',
		message: 'What would you like to do?',
		choices: [
			"View Product Sales by Department",
			"Create New Department",
			"Exit"
		]
	}
	]).then(function(answer) {

		 
		switch (answer.action) {
		    case "View Product Sales by Department":
		    	viewDepartmentSales();
		      	break;

		    case "Create New Department":
		    	createDepartment();
				  break;
				  
			case "Exit":
				connection.end();
				break;	  
		}
	});
};

 
var viewDepartmentSales = function() {
	var query = "Select department_id AS department_id, department_name AS department_name," +
				"over_head_costs AS over_head_costs, total_sales AS total_sales," +
				"(total_sales - over_head_costs) AS total_profit FROM departments";
	connection.query(query, function(err, res) {

		if (err) throw err;

		 
		console.table(res);
		selectAction();
	});
};

 
var createDepartment = function() {
		inquirer.prompt([{
		name: "department_name",
		type: "input",
		message: "What is the new department name?"
	}, {
		name: "over_head_costs",
		type: "input",
		message: "What are the overhead costs for this department?"
	}]).then(function(answer) {


		connection.query("INSERT INTO departments SET ?", {
			department_name: answer.department_name,
			over_head_costs: answer.over_head_costs
		}, function(err, res) {
			if (err) {
				throw err;
			} else {
				console.log("Your department was added successfully!");
				selectAction();
			}
		});
	});
};
