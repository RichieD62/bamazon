require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

var User = process.env.DB_USER;
var Password = process.env.DB_PASSWORD;

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: User,

    password: Password,
    database:"bamazon_db"

});


connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

function runProgram() {
    connection.query("SELECT item_id, product_name, price FROM products", function(err, results) { 
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("Product ID Number: " + results[i].item_id);
            console.log("Product: " + results[i].product_name);
            console.log("Price: " + results[i].price);
            console.log("-------------------------------------")
        }
    });
        
        inquirer.prompt([
            {
                type: "input",
                message: "Please enter the Product ID Number of the product that you would like to purchase:",
                name: "itemPurchased"
            },
            {
                type: "input",
                message: "Please enter the quantity of the item that you would like to purchase:",
                name: "quantityPurchased"
            }
        ]).then(function(response){
                console.log("Checking if item is in stock...");
                connection.query("SELECT stock_quantity, price FROM products WHERE item_id = ?", [response.itemPurchased], function(err, stockRes) { 
                    if (err) throw err;                    
                    if (stockRes[0].stock_quantity > 0 && stockRes[0].stock_quantity >= response.quantityPurchased) {
                        console.log("There are " + stockRes[0].stock_quantity + " left in stock.");

                        var newStock = stockRes[0].stock_quantity - response.quantityPurchased;
                        var totalPrice = parseFloat(stockRes[0].price) * parseInt(response.quantityPurchased);

                        connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newStock, response.itemPurchased], function(err) { 
                            if (err) throw err;
                            console.log("Successful Transaction");
                            console.log("New stock for " + response.itemPurchased + " is " + newStock);
                        })

                        console.log("Your total price today is $" + totalPrice);

                    } else {
                        console.log("Insufficient Quantity");
                    }
                    connection.end();
                });
        })

};


runProgram();
