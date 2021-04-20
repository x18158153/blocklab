var fs = require("fs")
let contract = require("./lab_4_contract_method_async")

const distribute = async() => {
    //read to the file into array 
var distributionAddresses = fs.readFileSync('accounts.txt', 'utf8').split('\n');

//get the balance of the token owner
var ownerBalance = await contract.getBalance("0xF8e9AD434dFC24e46B8B97718eF6b95c0229621B","0xB2Ee3F22D6AeFF1a870aAda0750474C070111C13" )
console.log(`owner balance is ${ownerBalance}`)

//get 5% of owner's balance
let tokenBalanceSplit = ownerBalance *0.05
console.log(`5% of owner balance is ${tokenBalanceSplit}`)

//get number of the addresses in the file
let numberOfAddresses = distributionAddresses.length
console.log (`number of addresses in file: ${numberOfAddresses}`)

//get the amount to distribute per address in the file 
let distributionAmount = tokenBalanceSplit / numberOfAddresses
console.log(`amount to distribute per address: ${distributionAmount}`)
//iterate  through the array and display contents
for (looper = 0; looper < distributionAddresses.length; looper++) {
    
 //   console.log(`address ${looper}: ${distributionAddresses[looper]}`)
}
}

distribute()

// tasks

// 1. load the file DONE
// 3. get the balance of the token owner DONE
// 4. get 5% of this balance DONE (?)
// 2. iterate through the addresses in the file DONE
// 5. distribute the 5% equally between the addresses in the file DONE
// 6. execute a transfer on the contract to perform the distribution DONE
