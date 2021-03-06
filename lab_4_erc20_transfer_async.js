const Tx = require('ethereumjs-tx').Transaction
const Web3 = require ('web3')

require('dotenv').config()
envOwnerAddress = process.env.OWNER_ADDRESS
envOwnerPrivateKey = process.env.OWNER_PRIVATE_KEY
envInfuraKey = process.env.INFURA_KEY
envContractAddress = process.env.CONTRACT_ADDRESS

const web3 = new Web3("https://ropsten.infura.io/v3/" + envInfuraKey)

const account1= envOwnerAddress // this is the address of account 1 this guy has all the ABE
const privateKey1 = Buffer.from(envOwnerPrivateKey, 'hex')


const account2="0x9e9F33ffd218C245cCc5CD45cdd6ffFb87414dC9"  // this is the address of account 2 this guy has little ABE



// algorithm secp256K1 (eliptic curve -256bits)
// the whole chain is going to be the metamask see phrase (12 words) -> BIP39 algorithm  -> create 128bits of randomness
//password is local only,used to encrypt the seed phrase
//using a mecanisim taking 128 randomness and making  derivation path : m’/44’/60’/0’/0/0 -> make the same public/private keypair
//Ethereum takes the public key -> hashed/choooed -> eth address

const contractAddress = envContractAddress
const contractABI =[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "_totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const contract = new web3.eth.Contract( contractABI, contractAddress)


const sendTransaction = async(raw) => {
    return await web3.eth.sendSignedTransaction(raw)
}
 
const transferFunds = async( account2, amount)=> {

    // the nonce - what is it?
    // the nonce is the transaction counter from a particular address
    // it is important to stop replay transactions , transactions it must run in order

    let txCount = await web3.eth.getTransactionCount(account1)

    console.log("txCount returned " + txCount)

    //create a transaction object
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(500000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
        to: contractAddress,
        data: contract.methods.transfer( account2, amount). encodeABI()
    }

    const tx = new Tx(txObject, {chain:'ropsten', hardfork:'petersburg'})
    tx.sign(privateKey1)

    const serializedTx =tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')
    let txHash = await sendTransaction(raw)
    console.log('original object: ' + txHash)
    //console.log("err: " + txHash.err)
    console.log("transaction hash: " +txHash.transactionHash)
    console.log("transaction in block " + txHash.blockNumber)

}

 
const getBalanceOf = async(account) => {
    let balanceOf = await contract.methods.balanceOf(account).call()
    return  balanceOf
}

const getSymbol = async() => {
	let symbol = await contract.methods.symbol().call()
	return symbol
}

const getTotalSupply = async () => {
	let totalSupply = await contract.methods.totalSupply().call()
	return totalSupply

}

const transfer = async() => {
  accountbal1 = await getBalanceOf(account1)
  console.log("account 1 balance is : " + accountbal1)

  symbol =await getSymbol()
  console.log('symbol of erc20 contract is: ' + symbol)

  supply = await getTotalSupply()
  console.log('total supply of '  + symbol + " is : " + supply)
  await getBalanceOf(account2)

await transferFunds( account2, '50000000000000000000')

}

const transferFromOwner = async(contractAddress, toAccount, amount) => {
	//get an instance of the contract
	const contract = new web3.eth.Contract(contractABI, contractAddress)
	
	//run a transfer from owner to account of amount  
	let txCount = await web3.eth.getTransactionCount(account1)
	
	console.log(`nonce for owner account (${account1}) is : ${txCount}`)
	
		//create a transaction object
	const txObject = {
		nonce: web3.utils.toHex(txCount),
		gasLimit: web3.utils.toHex(500000),
		gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
		to: contractAddress,
		data: contract.methods.transfer( toAccount, amount). encodeABI()
	}
	
	const tx = new Tx(txObject, {chain:'ropsten', hardfork:'petersburg'})
	tx.sign(privateKey1)
	
	const serializedTx =tx.serialize()
	const raw = '0x' + serializedTx.toString('hex')
	let txHash = await sendTransaction(raw)
	console.log("transaction hash: " +txHash.transactionHash)
	console.log("transaction in block " + txHash.blockNumber)
	return `transaction ${txHash.transactionHash} mined in block ${txHash.blockNumber}`
	
	}
  
	//transfer()

module.exports = { getSymbol, getTotalSupply, transfer, transferFromOwner }