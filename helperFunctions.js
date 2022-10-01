
var one=1
var two=2

module.exports.calculateAmountPaidAndNumberOfEMI=function(borrowerData,commandInputData,position)
   {
    if(position==-one){
    return returnAmountAndEmi(borrowerData,commandInputData.eminumber)  
    }
    return amountAndEmiOtherwise(borrowerData,commandInputData.eminumber,position) 
}


module.exports.findPreviousPaymentIndex=function(paymentHistory,emiNumber){
    for(var x=0; x<paymentHistory.length;x++){
        if(emiNumber<paymentHistory[x][one] && x==0){
            return -one;
        }
        else if(emiNumber>=paymentHistory[x][one] && x+1==paymentHistory.length){
            return x;
        }
        else{
            return x-one;
        } 
    }
}

module.exports.savePaymentOperations = function(borrower,calculatedAmount,newPaidEmis,newNumberOfEmis){
    var person  =customers[borrower.borrowerName][borrower.bankName];
    person.amountPaid =calculatedAmount;
    person.numberOfEmiPaid = newPaidEmis;
    person.paymentlumpsum.push([borrower.lumpSumAmount,borrower.eminumber,newNumberOfEmis])
}

function returnAmountAndEmi(data,emiNumber){
    var calculateAmount = data.emiAmount *emiNumber;
    var totalEmi = data.numberOfEmi;  
    return [calculateAmount,totalEmi]; 
}

function amountAndEmiOtherwise(borrowerData,eminumber,position){
    var calculateAmount = borrowerData.amountPaid + (eminumber-borrowerData.numberOfEmiPaid)*borrowerData.emiAmount; 
    var totalEmi = borrowerData.paymentlumpsum[position][two]; 
    return [calculateAmount,totalEmi];

}