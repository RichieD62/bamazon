# bamazon

Bamazon is a command line application that allows the user to do various things based on his/her relationship with bamazon. If the user is a customer of bamazon, he/she will be able to see all of the items that are for sale, select a quantity that he/she would like to buy, and receive a final price. If the user is a manager for bamazon, he/she will have some more options. The bamazon manager will have access to the following commands:

* View Products for Sale
* View Low Inventory
* Add to Inventory
* Add New Product

This application utilizes MySQL Database to store and access information. Every action that the user has access to has an effect on information within the database. To use the application, the user will have to unstall Node.js (if that is not already installed), and then using his/her terminal, navigate to the folder where the bamazonCustomer.js and bamazonManager.js files are located. Once there, the user can either type in **node bamazonCustomer.js** or **node bamazonManager.js**. 


1. **node bamazonCustomer.js**:
    This command will begin the bamazonCustomer.js application. Once the user enters the command into the terminal, the js file will pull information from the MySQL Database and print it to the console. The program will print the unique item ID number, the name, and the price of each item that bamazon has in its database. The program will prompt you to enter the unique item ID number of the item that he/she would like to purchase. Once the user enters a unique ID number, the user will be prompted to enter how many of said item he/she would like to purchase. Once the user enters in how much of the item he/she would like to purchase, the program will check to see if there is enough stock to fill the users order. If there is, the program will print how many are left in stock, what the total price is for the order, and then what the new stock is once the order is complete. 

1. **node bamazonManager.js**:
    This command will begin the bamazonManager.js application. Once the user enters the command into the terminal, he/she will be presented with a list of options to choose from. Those options are: 

    1. *View Products for Sale* -- Once the user chooses this command, the program will print a list of all of the items that bamazon has for in its database. The program will print the unique item ID number, the name, the price, and the much of the item is in stock for every item that bamazon has in its database. 

    1. *View Low Inventory* -- Once the user chooses this command, the program will go through the database and check on the stock quantity for every item in the database. If an item has less than 5 units left in inventory, the program will print an alert to the console saying that there is low inventory for an item, and will also proceed to print the unique ID number, name, price, and stock quantity for the item. If the item has more than 5 units in inventory, the program will print to the console that the item is well stocked. 

    1. *Add to Inventory* -- Once the user chooses this command, the program will print a list of all of the items that bamazon has for in its database.  The program will then prompt the user to enter in the unique item ID number of the item that he/she would like to add inventory to. Once the user enters the unique item ID number, he/she will be prompted to enter how many units he/she would like to add. Once the user enters how many units he/she would like to add, the program will add the desired number of units to the item that the user identified in the MySQL database.

    1. *Add New Product* -- Once the user chooses this command, he/she will be prompted to add a product name, a department, a price/unit, and how many units he/she would like to have in stock for the item that he/she would like to add to inventory. Once the user enters that information into the console, the program will add the item to the MySQL database. 


The biggest challenge that I experienced with this program was simply debugging the minor errors. There was not anything that was extremely complicated or difficult, there was just simply a lot of minor debugging and it seemed like every time I fixed one bug, another one was created. However, after spending some time working on debugging and getting some training on how to use the debugger in VS Code, I was able to create a bug free program that works as intended.

If you would like to see a short demo of how the program works in your terminal, please copy and paste this link into your favorite web browser: https://drive.google.com/file/d/1poQczF8xOqENWPxP15muC8aElkhpiFYJ/view

