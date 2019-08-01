const welcome = require('./index')
module.exports = class Administrator{
    constructor(name, password){
        this.name = name;
        this.password = password;
    }

    loadMoney(amount1, ATMobject){
        amount1 = parseInt(amount1);
        ATMobject.amount += amount1;
        ATMobject.isEquipped = true;
    }

    removeMoney(amount1, ATMobject){
        amount1 = parseInt(amount1);
        if(amount1 >= ATMobject.amount){
            ATMobject.amount = 0;
        }else{
            ATMobject.amount = ATMobject.amount - amount1;
        }
    }

    closeATM(ATMobject){
        ATMobject.isOpen = false;
    }
    openATM(ATMobject){
        ATMobject.isOpen = true;
    }
}