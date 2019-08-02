// This is the index file

//================================================//
//    Importing    The ATM Class                  //
//===============================================//
var ATM = require('./classATM.js');


//===============================================//
//     Importing the customers data              //
//===============================================//
var customers = require('./customers.js');


//==============================================//
//   Importing the customers class             //
//=============================================//
var User = require('./classCustomer.js');


//==============================================//
//  Importing The Admin Data                   //
//=============================================//
var admin = require('./admin.js');



//==============================================//
//  Importing The Admin class                   //
//=============================================//
var Administrator = require('./classAdmin.js');


//==============================================//
//  Importing the readline       module        //
//=============================================//
const prompt = require('readline').createInterface(process.stdin, process.stdout);


//==============================================//
// Requiring the cli-table  npm                  //
//=============================================//
const Table = require('cli-table');


//==============================================//
//       requiring the color  npm      //
//=============================================//

const colors = require('colors');


// The header function, designed for every header
function header(title, msg) {
    console.clear();

    var table = new Table({
        chars: { 'top': '═', 'top-left': '╔', 'top-right': '╗', 'bottom': '═', 'bottom-left': '╚', 'bottom-right': '╝', 'left': '║', 'right': '║' },
        head: [title],
        colWidths: [72],
        colAligns: ['middle']
    });
    console.log(table.toString());

    if (msg.length < 1) {
        console.log();
    } else {
        console.log();
        console.log(colors.red( '=> '), msg)
        console.log()
        console.log();
    }
}


var atm1 = new ATM("ATM1", 0, false, true);

console.log("")


// The welcome function which is the entry point
function welcome(msg) {
    header("WELCOME TO VICTORY BANK", msg)
        console.log("1. ".green, "Use as customer.".green);
        console.log();
        console.log("2. ".green, "Use as Administrator".green);
        console.log();
        prompt.question("Please choose an option: ".cyan, (opt) => {
            if (opt == 1 && atm1.isDisabled == true) {
                runCustomer()
            } else if(opt == 2) {
                runAministrator("");
            }else if(opt == 1 && atm1.isDisabled == false){
                welcome(atm1.name + " have been disabled");
            }else{
                welcome("INVALID INPUT");
            }
        })
}


var admin1;


// This function will run if the user is a client and not an admin
function runCustomer(){
    header("Verify that you are the owner of this card", "")
    function VerifyName(){
        prompt.question("Please input your name(Vicman) : ", (userName) =>{
            verifyUserPassword(userName);
        })
    }
    // go to customers.js to take any account you would want to use to test
    function verifyUserPassword(username){
        prompt.question("Enter password(ubuntu23) : ", (pass) =>{
            let foundUser = customers.find(userMe => userMe.name == username);
            if(foundUser && foundUser.password == pass){
                user1 = new User(username, foundUser.amount, foundUser.password, foundUser.accountNo);
                legalUserOperation(user1, foundUser.name.toUpperCase() + ", we have verified that u are a legit user");
            }else{
                console.clear();
                welcome("Access Denied !!!");
            }
        })
    }
    VerifyName();
}


// If the user is verified to be a legal user, run this function 


function legalUserOperation(user, msg){
    header("You are a legit customer", msg);
    console.log();
    console.log("1. ", "Withdrawal".red);
    console.log();
    console.log("2. ", "Transfer".red);
    console.log();
    console.log("3. ", "Check Account Balance".red);
    console.log();
    console.log("4. ", "Recharge".red);
    console.log();

    prompt.question("Choose an an option : ", (opti) =>{
        if(opti == 1){
            withdrawal(user, atm1, "Choose you amount");
        }else if(opti == 2){
            transfer(user);
        }else if(opti == 3){
            checkBalance(user1);
        }else if( opti == 4 ){
            recharge(user);
        }else{
            legalUserOperation(user, "Invalid Input")
        }

        // The widrawal function 
        function withdrawal(userAgent, atm1, msg){
            header(userAgent.name + " You can only make withdrawal if you have enough money in your account",msg);
            console.log();
            console.log();
            console.log("1. ", "1000".red);
            console.log();
            console.log("2. ", "5000".red);
            console.log();
            console.log("3. ", "10000".red);
            console.log();
            console.log("4. ", "15000".red);
            console.log();
            console.log("5. ", "20000".red);
            console.log();

            prompt.question("Enter an option : ", options => {
                if(options == 1 ){
                   userAgent.withdraw(1000, atm1)
                }else if(options == 2){
                    userAgent.withdraw(5000, atm1)
                }else if(options == 3){
                    userAgent.withdraw(10000, atm1)
                }else if(options == 4){
                    userAgent.withdraw(15000, atm1)
                }else if(options == 5){
                    userAgent.withdraw(20000, atm1)
                }else{
                    withdrawal(userAgent, atm1, "Invalid input")
                }
            })
        }


        // The check balance function 
        function checkBalance(user11){
            header("Dear " + user11.name + " This is your account details", "Have fun dear")
            console.log(" Name : ", user11.name.toUpperCase())
            console.log();
            console.log("=================================")
            console.log("Account No : " ,user11.balance);
            console.log();
            console.log("=================================")
            console.log();
            console.log("Account Balance: ", user11.accountNo);
            console.log();
            console.log("=================================")
            console.log("Thank you for banking with us.");

            toHome("")
        }

        function transfer(user11){
            toHome(user11.name + ", Sorry, you cannot make transfers with this ATM because of network issues");
        }

        function recharge(user11){
            toHome(user11.name + ", Sorry, you cannot make recharge because of network issues")
        }
    })

}


// This function will run if the user choose the administrator
function runAministrator(msg) {
    header("VERIFY THAT YOU ARE AN ADMINISTRATOR", msg)
    function verifyAdminName() {
        prompt.question("Please input your name(use Uche or any admin option in the admin.js): ", (adminName) => {
            if(adminName){
                verifyAdminPassword(adminName);
            }else{
                runAministrator("INVALID INPUT !!!");
            }
        })
    }

    function verifyAdminPassword(name) {
        console.clear();
        prompt.question("Enter your password: use 5eret3 as passord...:", (pass) => {
            let foundAdmin = admin.find(ad => ad.name == name);
            if ( foundAdmin && foundAdmin.password == pass) {
                admin1 = new Administrator(name, pass);
                doAdminJob(admin1);
            }else{
                console.clear();
                welcome("ACCESS DENIED !!!");
            }
        })
    }
    verifyAdminName();
}



//After  verifying that the user is an administrator, this function is called 
function doAdminJob(admin1) {
    header("You are an Administrator",admin1.name + " We have verified that you are an administrator");
    console.log();
    console.log("1. ", "Load Money to ATM".red);
    console.log();
    console.log("2. ", "Remove Money From the  ATM".red);
    console.log();
    console.log("3. ", "Close ATM".red);
    console.log();
    console.log("4. ", "Check ATM Balance".red);
    console.log();

    // If the admin wants to load money, this function runs    
    function loadMoni() {
        console.log();
        prompt.question("Enter the amount to load to the ATM: ", (amount) => {
            if(amount == "" || isNaN(amount)){
                welcome("There is no money in this ATM");
            }else if(!isNaN(amount)){
                amount = parseInt(amount);
                admin1.loadMoney(amount, atm1);
                toHome("You added " + amount + " to the ATM.\n " + atm1.name + " balance is now " + atm1.amount);
            }
        })
    }


    // If the admin wants to remove Money, this program runs
    function removeMoni(msg){
        header("Be sure the ATM is loaded before removing money", msg);
        prompt.question("Enter the amount you want to remove from the ATM : ", (amount) => {
            if(isNaN(amount)){
               welcome("invalid Input")
            }else if(amount > atm1.amount){
                welcome("The money you inputed is greater than the money in this ATM try again")
            }else{
                amount = parseInt(amount);
                admin1.removeMoney(amount, atm1);
                welcome("Money removed")
            }
           
        })
    }


    // If admin wants to disable the ATM
    function closeATM(){
        atm1.disable();
        toHome(atm1.name + " have been disabled");
    }


    function checkATM_Balance(){
        console.log("============================");
        console.log("ATM ENQUIRY");
        console.log();
        console.log("ATM name : ",atm1.name);
        console.log("Balance : ", atm1.amount);
        console.log();
        toHome("");
    }


    prompt.question('Enter an option: ', (option) => {
        if (option == 1) {
            loadMoni();
        }else if(option == 2){
            removeMoni("");
        }else if(option == 3){
            closeATM();
        }else if(option == 4){
            checkATM_Balance();
        }else{
            doAdminJob(admin1);
        }
    })

}

// this function is used to ask the user if he/she wants to go back to home
function toHome(msg){
   console.log("==================================");
   console.log(msg);
   console.log("===================================")
    prompt.question("Perform another transaction? y/n : ", (ansa) =>{
        if(ansa == "y"|| ansa == "Y" ){
            welcome('');
        }else if(ansa == "n"|| ansa == "N"){
            console.log("Have a baeish day");
        }else{
            toHome("Invalid input");
        }
    })
}

// We call the function here

welcome('')

exports.welcome = welcome;