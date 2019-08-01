const customers = require("./customers.js");
const welcome = require("./index.js");

 class Customers{

    constructor(name, balance, password, accountNo){
        this.name = name;
        this.balance = balance;
        this.password = password;
        this.accountNo = accountNo;
    }

    withdraw(amount1, atm1){
        let finding = customers.find(userMee => userMee.name == this.name);
        if(atm1.isEquipped == false || atm1.amount <=  amount1){
            welcome.welcome("Unable to dispense Cash");
            return;
        }else if(finding.amount >= amount1 && atm1.amount >= amount1){
            finding.amount = finding.amount - amount1;
            atm1.amount -= amount1;
            welcome.welcome(this.name + " Thank for banking with us.")
        }else{
            console.log("============================")
            console.log("You have insufficeint fun");
        }
    } 
}

module.exports = Customers;