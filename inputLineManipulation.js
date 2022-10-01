var one=1
var two=2
var three =3
var four =4
var five=5
module.exports.seperatedArrayIntoVariables = function(inputString,typeOfCommand){
    //type of command here is LOAN or PAyment Or BALANCE
    switch(typeOfCommand){
        case 'LOAN':
            return seperateArrayForLoan(inputString);
        case 'PAYMENT':
            return seperateArrayForPayment(inputString);
        case 'BALANCE':
            return seperateArrayForBalance(inputString)
    }
}

function seperateArrayForLoan(input){
    var inputString=input.split(" ");
    var commandContent ={}
    commandContent.bankName       = inputString[one]    
    commandContent.borrowerName   = inputString[two];
    commandContent.principal      = parseInt(inputString[three]);
    commandContent.tenure         = parseInt(inputString[four]);
    commandContent.rateOfInterest = parseInt(inputString[five]);
    return commandContent
}

function seperateArrayForPayment(input){
    var inputString=input.split(" ");
    var commandContent ={}
    commandContent.bankName       = inputString[one]
    commandContent.borrowerName   = inputString[two];
    commandContent.lumpSumAmount  = parseInt(inputString[three]);
    commandContent.eminumber      = parseInt(inputString[four]);
    return commandContent;
}

function seperateArrayForBalance(input){
    var inputString=input.split(" ");
    var commandContent ={}
    commandContent.bankName       = inputString[one]
    commandContent.borrowerName   = inputString[two];
    commandContent.eminumber      = parseInt(inputString[three]);
    return commandContent;
}