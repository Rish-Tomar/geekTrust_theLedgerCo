const fs = require("fs")
var pos=2
const filename = process.argv[pos]

// IMPORTS
const inputCommand= require('./inputCommand')

fs.readFile(filename, "utf8", (err, data) => {
    if (err) throw err
    var inputLines = data.toString().split("\n")
    // Add your code here to process input commands

    inputLines.forEach(line=>{
        var firstWord = line.split(" ")[0]//fetching first word of each line  
        // applying switch case
        switch (firstWord) {
            case 'LOAN'   :
                inputCommand.loan(line)
                break;
            case 'PAYMENT':
                inputCommand.payment(line)
                break;
            
            case 'BALANCE':
                inputCommand.balance(line)
                break;        
            default:
                break;
        }
    })
})
