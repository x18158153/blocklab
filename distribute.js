var fs = require("fs")
var BigNumber = require("big-number")


let contract = require("./lab_4_contract_method_async")
let transfer = require("./lab_4_erc20_transfer_async")

require('dotenv').config()
envOwnerAddress = process.env.OWNER_ADDRESS
envOwnerPrivateKey = process.env.OWNER_PRIVATE_KEY
envInfuraKey = process.env.INFURA_KEY
envContractAddress = process.env.CONTRACT_ADDRESS


const distribute = async() => {

//read to the file into array 
let distributionAddresses = fs.readFileSync('accounts.txt', 'utf8').split('\n');

for (looper = 0; looper < distributionAddresses.length; looper++) {
    console.log(`address ${looper}: ${distributionAddresses[looper]}`)
  }

//get the balance of the token owner
let ownerBalance = await contract.getBalance(envContractAddress,envOwnerAddress )
console.log(`owner balance is ${ownerBalance}`)

//get 5% of owner's balance
//convert balance to BigNumber
let bal = new BigNumber(ownerBalance)
let fivepercent = bal.div(20)
//let tokenBalanceSplit = ownerBalance * 0.05
console.log(`5% of owner balance is: ${fivepercent}`)

//get number of the addresses in the file
let numberOfAddresses = distributionAddresses.length
console.log (`number of addresses in file: ${numberOfAddresses}`)

//get the amount to distribute per address in the file 
//let distributionAmount = tokenBalanceSplit / numberOfAddresses
let distributionAmount = fivepercent.div(numberOfAddresses)
console.log(`amount to distribute per address: ${distributionAmount}`)

//iterate  through the array and display contents
for (looper = 0; looper < distributionAddresses.length; looper++) {
    // I need to create distributionAddress to replace \r as per windows behaviour:
    let distributionAddress = distributionAddresses[looper].replace("\r","");
    let mined = await transfer.transferFromOwner(envContractAddress, distributionAddress, distributionAmount).catch(console.log)
    //use for if running in linux:
    //let mined = await transfer.transferFromOwner(envContractAddress, distributionAddresses[looper], distributionAmount)
    console.log(`mined: ${mined}`)
  
}
}
module.exports = {  distribute }
