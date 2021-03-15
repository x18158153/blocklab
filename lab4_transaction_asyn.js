const Tx = require('ethereumjs-tx').Transaction

const Web3 = require ('web3')

const web3 = new Web3("https://ropsten.infura.io/v3/de9990cb56cd42e2a479a47ec959f9e0")

const account1= "0xB2Ee3F22D6AeFF1a870aAda0750474C070111C13" // this is the address of account 1 this guy has all the MONEH
const account2="0x9e9F33ffd218C245cCc5CD45cdd6ffFb87414dC9"  // this is the address of account 2 this guy has little MONEH

const privateKey1 = Buffer.from('...', 'hex')
const privatekey2 = Buffer.from('...', 'hex')

