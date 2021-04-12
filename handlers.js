const express = require("express")
let erc20 = require('./lab_4_erc20_transfer_async.js')
const app = express()

app.use(express.json())

//GET - read
//POST - create a new vaule
//PUT - update a value
//DELETE - remove a value

app.get('/symbol', async (req, res) => {
    res.send(await erc20.getSymbol())
})

app.get('/supply', async (req, res) => {
    res.send(await erc20.getTotalSupply())
})

app.get('/transfer', async (req, res) => {
    res.send(await erc20.transfer())
})

const port = 8082
app.listen(port, () => console.log ( `listening on port ${port}...`))
