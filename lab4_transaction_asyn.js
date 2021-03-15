const Tx = require('ethereumjs-tx').Transaction

const Web3 = require ('web3')

const web3 = new Web3("https://ropsten.infura.io/v3/de9990cb56cd42e2a479a47ec959f9e0")

const account1= "0xB2Ee3F22D6AeFF1a870aAda0750474C070111C13" // this is the address of account 1 this guy has all the MONEH
const account2="0x9e9F33ffd218C245cCc5CD45cdd6ffFb87414dC9"  // this is the address of account 2 this guy has little MONEH

const privateKey1 = Buffer.from('d0b7a9cc48a6b8d04c735a0d2558b31703a7500c9bd5fc6513c8591f78671640', 'hex')
const privatekey2 = Buffer.from('637e7f44be65928d2fe36e5f46cc3e338d40aef9c4825d1717c783f080e1471e', 'hex')

// algorithm secp256K1 (eliptic curve -256bits)
// the whole chain is going to be the metamask see phrase (12 words) -> BIP39 algorithm  -> create 128bits of randomness
//password is local only,used to encrypt the seed phrase
//using a mecanisim taking 128 randomness and making  derivation path : m’/44’/60’/0’/0/0 -> make the same public/private keypair
//Ethereum takes the public key -> hashed/choooed -> eth address


 