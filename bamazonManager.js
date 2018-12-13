var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "gerald14",
    database:"bamazon_db"

});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

function startProgram() {

    inquirer.prompt([
        {
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "managerChoice"
        }
    ]).then(function(response){

        switch (response.managerChoice) {

            case "View Products for Sale":
            viewProducts();
            break;
        
            case "View Low Inventory":
            lowInventory();
            break;

            case "Add to Inventory":
            addInventory();
            break;

            case "Add New Product":
            newProduct();
            break;
        }
    })
}




function viewProducts() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results) { 
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("Product ID Number: " + results[i].item_id);
            console.log("Product: " + results[i].product_name);
            console.log("Price: " + results[i].price);
            console.log("Quantity: " + results[i].stock_quantity);
            console.log("-------------------------------------")
        }
        connectionEnd();
    });
};

function lowInventory() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results) { 
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            if (results[i].stock_quantity <= 5) {
                console.log("~~~~~LOW STOCK!~~~~~")
                console.log("Product ID Number: " + results[i].item_id);
                console.log("Product: " + results[i].product_name);
                console.log("Price: " + results[i].price);
                console.log("Quantity: " + results[i].stock_quantity);
                console.log("-------------------------------------")
            } else {
                console.log(results[i].product_name + " is well stocked");
            }
            
        }
        connectionEnd();
    });
};

function addInventory() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, results) { 
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("Product ID Number: " + results[i].item_id);
            console.log("Product: " + results[i].product_name);
            console.log("Price: " + results[i].price);
            console.log("Current Inventory: " + results[i].stock_quantity)
            console.log("-------------------------------------")
        }
    });
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the Product ID Number of the product that you would like to add inventory to: ",
            name: "itemSelected"
        },
        {
            type: "input",
            message: "Please enter how many more units you would like to add: ",
            name: "inventoryAdded"
        }
    ]).then(function(response){
            connection.query("SELECT stock_quantity, product_name FROM products WHERE item_id = ?", [response.itemSelected], function(err, stockRes) { 
            if (err) throw err;

            var newInventory = parseInt(stockRes[0].stock_quantity) + parseInt(response.inventoryAdded); 

            connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newInventory, response.itemSelected], function(err) { 
            if (err) throw err;
            console.log("Inventory Successfully Added");
            })
            connectionEnd();
        })
    
    });
    
}

function newProduct() {
    inquirer.prompt([
        {
            type: "input",
            message: "Product Name: ",
            name: "productName"
        },
        {
            type: "input",
            message: "Department: ",
            name: "departmentName"
        },
        {
            type: "input",
            message: "Price: ",
            name: "startingPrice"
        },
        {
            type: "input",
            message: "Units: ",
            name: "startingUnit"
        },
    ]).then(function(response){
        connection.query("INSERT INTO products SET ?", {
            product_name: response.productName,
            department_name: response.departmentName,
            price: response.startingPrice,
            stock_quantity: response.startingUnit
        }, function(err) {
            if (err) throw err;
            console.log("New product successfully launched!");
        });
        connectionEnd();
    })
};


function connectionEnd() {
    connection.end();
}

startProgram();
