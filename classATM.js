module.exports = class ATM{
    constructor(name, amount, isEquipped, isDisabled){
        this.name = name;
        this.amount = amount;
        this.isEquipped = isEquipped;
        this.isDisabled = isDisabled;
    }

    disable(){
        this.isDisabled = false;
    }
}