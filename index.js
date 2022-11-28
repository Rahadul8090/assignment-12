const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000

app.use(cors())


// password: fW6KsnOGrxTLbr2E

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://assignment-12:fW6KsnOGrxTLbr2E@cluster0.qzaiqpb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 
function run() {
    try {
      const categoreData = client.db('categories').collection('categories-name')

      app.get('/categore', async (req, res)=>{
        const quriy = {}
        const categories = categoreData.find(quriy)
        const result = await categories.toArray()
        res.send(result)
      })
    }
    finally {

    }
}
run()
 
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})