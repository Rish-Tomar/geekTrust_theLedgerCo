// "test": "mocha test.js"
//Add your tests here
// const assert = require('chai').assert
const assert = require('assert')
const calculatingFunctions = require('./calculatingFunctions')
const helperFunctions =require('./helperFunctions')
const inputLineManipulation =require('./inputLineManipulation')

var borrowerDataForEmi = {
    amount: 5300,
    numberOfEmi: 12,
    numberOfEmiPaid: 5,
    emiAmount: 442,
    amountPaid: 3210,
    paymentlumpsum: [ [ 1000, 5, 10 ] ]
}

var inputDataForEmi ={
    bankName: 'IDIDI',
    borrowerName:'Dale',
    eminumber: 6,
}

var expectedObjectForLoan  = {
    bankName: 'IDIDI',
    borrowerName:'Dale',
    principal: 1000,
    tenure: 1,
    rateOfInterest:6
}

var expectedObjectForPayment  = {
    bankName:'IDIDI',
    borrowerName:'Dale',
    lumpSumAmount: 1000,
    eminumber: 12,
}

var expectedObjecctForBalance  = {
    bankName: 'UON',
    borrowerName:'Shelly',
    eminumber: 12,
}

describe('checking Calculating Functions Amount', function(){

        it('check Amount Calculation',function(){
            var expected =5300
            var input=[5000,1,6]
            assert.equal(calculatingFunctions.Amount(input[0],input[1],input[2]),expected)
        })
})
describe('checking Calculating Functions EMI', function(){
        it('check emi amount calculation',function(){
            var expected=442
            var input=[5300,1]
            assert.equal(calculatingFunctions.EmiAmount(input[0],input[1]),expected);
        })
})
describe('checking Calculating Functions number of emi', function(){
        it("check number of emi calculation",function(){
            var expected=12
            var input=[5300,442]
            assert.equal(calculatingFunctions.NumberOfEmi(input[0],input[1]),expected)
        })
})       


describe('checking helper functions calculate',function(){
    it("checking calculate emi and #emi's",function(){     
        var expectedResult =[3652,10]
        var calculatedresult = helperFunctions.calculateAmountPaidAndNumberOfEMI(borrowerDataForEmi,inputDataForEmi,0)
        var bool = checkEqual(calculatedresult,expectedResult) 
        assert.ok(bool)
    })
})

describe('checking helper functions position ',function(){
    it('check position function result',function(){
        var payHistory =[  [ 1000, 5, 10 ] ]
        var eminumber = 6
        var expectedResult = 0;
        assert.equal(helperFunctions.findPreviousPaymentIndex(payHistory,eminumber),expectedResult)
    })
})

describe("check string split functionality for loan", function(){
    it('check seperate array to variables for loan',function(){
        var calculated = inputLineManipulation.seperatedArrayIntoVariables('LOAN IDIDI Dale 1000 1 6','LOAN')
        var bool=checkEqual(calculated,expectedObjectForLoan)
        assert.ok(bool);
    })
})
describe("check string split functionality for payment", function(){
    it('check seperate array to variables for payment',function(){
        var calculated = inputLineManipulation.seperatedArrayIntoVariables('PAYMENT IDIDI Dale 1000 12','PAYMENT')
        var bool=checkEqual(calculated,expectedObjectForPayment)
        assert.ok(bool);
    })

})
describe("check string split functionality for balance", function(){
    it('check seperate array to variables for balance',function(){
        var calculated = inputLineManipulation.seperatedArrayIntoVariables('BALANCE UON Shelly 12','BALANCE')
        var bool=checkEqual(calculated,expectedObjecctForBalance)
        assert.ok(bool);
    })

})



function checkEqual(first,second){
    JSON.stringify(first);
    if(JSON.stringify(first)===JSON.stringify(second)){
        return true;
    }
    else return false;

}