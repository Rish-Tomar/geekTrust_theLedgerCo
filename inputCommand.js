//IMPORT's
const helperFunctions    = require('./helperFunctions')
const calculate = require('./calculatingFunctions')
const inputManipulation  = require('./inputLineManipulation.js')
//defining a object for storing borrower's data. 
customers ={}
var zero=0
var one=1
module.exports.loan = function(line){    
    // seperate the Bank Name , customer name etc from the input line and save into a object named borrower.
    var borrower = inputManipulation.seperatedArrayIntoVariables(line,'LOAN');
    //calculating amount and emi's.
    var calculatedDetails = calculate.AmountEmiAndEmiNumber(borrower.principal,borrower.tenure,borrower.rateOfInterest);
    checkandCreateRecord(borrower.bankName,borrower.borrowerName,calculatedDetails)    
}

module.exports.balance = function(inputLine){
    //seperate the values and save into variables and save into a object.
    var borrower = inputManipulation.seperatedArrayIntoVariables(inputLine,'BALANCE');
    var BorrowingPerson = customers[borrower.borrowerName][borrower.bankName];
    var calculatedAmount=zero
    var total_emi =zero
    //calculate amount and #emi's
    var amountAndNumberEmis=amountAndTotalEmi(BorrowingPerson,borrower) 
    var numberOfEmiLeft =amountAndNumberEmis[1]-borrower.eminumber;
    console.log(borrower.bankName,borrower.borrowerName,amountAndNumberEmis[0],numberOfEmiLeft);
}

module.exports.payment = function(inputLine){   
    //seperate the values into a objectvariables
    var borrower = inputManipulation.seperatedArrayIntoVariables(inputLine,'PAYMENT');
    // fetch records from the customers(Borrower) data
    var person =customers[borrower.borrowerName][borrower.bankName];
    //calculating the amount paid and emi's changes if any due to lump sum amount
    var newPaidEmis= borrower.eminumber-person.numberOfEmiPaid ; 
    var calculatedamount = newPaidEmis*person.emiAmount + borrower.lumpSumAmount;    
    var newNumberOfEmis = borrower.eminumber-person.numberOfEmiPaid+Math.ceil((person.amount-calculatedamount)/person.emiAmount)
    //saving the changes back to the object
        helperFunctions.savePaymentOperations(borrower,calculatedamount,newPaidEmis,newNumberOfEmis)       
}


function checkandCreateRecord(bank,borrowerName,data){
    if(!(borrowerName in customers )){
        customers[borrowerName]={
        }      
    }    
    customers[borrowerName][bank]={
        amount:data[0],
        numberOfEmi:data[2],
        numberOfEmiPaid:zero,
        emiAmount:data[1],
        amountPaid:zero,
        paymentlumpsum:[],
    }      
}

function amountAndTotalEmi(borrower,input){
    //check if no previous payments done if no payment done then paymentHistory array will be empty.
    if(borrower.paymentlumpsum.length==0){
        return [borrower.emiAmount *input.eminumber,borrower.numberOfEmi]
    }
    var position= helperFunctions.findPreviousPaymentIndex(borrower.paymentlumpsum,input.eminumber);
    //calling a function to get amount and number of emi's as a return value in an array.
    var returnVaules =helperFunctions.calculateAmountPaidAndNumberOfEMI(borrower,input,position)
    return [returnVaules[zero]>borrower.amount?borrower.amount:returnVaules[zero],returnVaules[one]]          
}