// create  an ethereum transaction we need to be able to build it that is why we need the libraries ethereumjs and Web3 . Dependecies:
const Tx = require('ethereumjs-tx').Transaction

//second dependencies 
const Web3 = require ('web3')

//make a web3 object
const web3 = new Web3("https://ropsten.infura.io/v3/de9990cb56cd42e2a479a47ec959f9e0")

const account1= "..." // this is the address of account 1 this guy has all the MONEH
const account2="..."  // this is the address of account 2 this guy has little MONEH

const privateKey1 = Buffer.from('...', 'hex')
const privatekey2 = Buffer.from('...', 'hex')

// algorithm secp256K1 (eliptic curve -256bits)
// the whole chain is going to be the metamask see phrase (12 words) -> BIP39 algorithm  -> create 128bits of randomness
//password is local only,used to encrypt the seed phrase
//using a mecanisim taking 128 randomness and making  derivation path : m’/44’/60’/0’/0/0 -> make the same public/private keypair
//Ethereum takes the public key -> hashed/choooed -> eth address

//setup code send transaction to web3
const sendTransaction = async(raw) => {
    return await web3.eth.sendSignedTransaction(raw)
}
 
const transferFunds = async( account1, account2, amount)=> {

    // the nonce - what is it?
    // the nonce is the transaction counter from a particular address
    // it is important to stop replay transactions , transactions it must run in order

    let txCount = await web3.eth.getTransactionCount(account1)

    console.log("txCount returned " + txCount)

    //create a transaction object
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        to: account2,
        value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
    }

    const tx = new Tx(txObject, {chain:'ropsten', hardfork:'petersburg'})
    //sign the transaction object with private key ( verify with public key):
    tx.sign(privateKey1)


    const serializedTX =tx.serialize()
    const raw = '0x' + serializedTX.toString('hex')
    console.log("raw tx in hex:" + raw)
    let txReceipt = await sendTransaction(raw)
    console.log('original object: ' + txReceipt)
    //console.log("err: " + txHash.err)
    console.log("transaction hash: " +txReceipt.transactionHash)
    console.log("transaction in block " + txReceipt.blockNumber)

}
 
const transfer = async() => {
await transferFunds(account1, account2, '0.123')

}

//transfer()