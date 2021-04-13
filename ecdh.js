var sodium = require('sodium-native')

//ECDH
//x25519


//Create Alice keypair
var AlicePublicKey = sodium.sodium_malloc(sodium.crypto_box_PUBLICKEYBYTES)
var AlicePrivateKey = sodium.sodium_malloc(sodium.crypto_box_SECRETKEYBYTES)

sodium.crypto_box_keypair(AlicePublicKey,AlicePrivateKey)

console.log(`Alice ${sodium.crypto_box_PUBLICKEYBYTES} -byte public key is: ${AlicePublicKey.toString('hex')} `)
console.log(`Alice ${sodium.crypto_box_SECRETKEYBYTES} -byte private key is: ${AlicePrivateKey.toString('hex')} `)

//Create bob Keypair
var BobPublicKey = sodium.sodium_malloc(sodium.crypto_box_PUBLICKEYBYTES)
var BobPrivateKey = sodium.sodium_malloc(sodium.crypto_box_SECRETKEYBYTES)

sodium.crypto_box_keypair(BobPublicKey,BobPrivateKey)

console.log(`Bob ${sodium.crypto_box_PUBLICKEYBYTES} -byte public key is: ${BobPublicKey.toString('hex')} `)
console.log(`Bob ${sodium.crypto_box_SECRETKEYBYTES} -byte private key is: ${BobPrivateKey.toString('hex')} `)
//Alice to create secret using her private key and bob's public key

//Bob to create secret using his private key and alice's public key