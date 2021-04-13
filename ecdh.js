var sodium = require('sodium-native')

//ECDH
//x25519


//Create Alice keypair
var AlicePublicKey = sodium.sodium_malloc(sodium.crypto_box_PUBLICKEYBYTES)
var AlicePrivateKey = sodium.sodium_malloc(sodium.crypto_box_SECRETKEYBYTES)
//Create bob Keypair

//Alice to create secret using her private key and bob's public key

//Bob to create secret using his private key and alice's public key