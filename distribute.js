var fs = require("fs")

//read to the file into array 
var distributionAddresses = fs.readFileSync('accounts.txt', 'utf8').split('\n');

//iterate  through the array and display contents
for (looper = 0; looper < distributionAddresses.length; looper++) {
    console.log(`address ${looper}: ${distributionAddresses[looper]}`)
}