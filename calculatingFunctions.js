module.exports.Amount = function(principal,tenure,rate){
    var hundred =100;
    return ((principal * tenure * rate)/hundred) + principal
}

module.exports.EmiAmount = function(amount,tenure){
    var months =12;
    return Math.ceil(amount/(tenure*months))
}

module.exports.NumberOfEmi =function(amount,emiAmount){
    return Math.ceil(amount/emiAmount);
}

module.exports.AmountEmiAndEmiNumber=function(principal,tenure,rate){
    var amount=this.Amount(principal,tenure,rate)
    var emiAmount=this.EmiAmount(amount,tenure)
    var numberOfEmi = this.NumberOfEmi(amount,emiAmount)
    return [amount,emiAmount,numberOfEmi];

}