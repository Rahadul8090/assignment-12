const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
require('dotenv').config()



const uri = `mongodb+srv://${process.env.MONGO_DB_NAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.qzaiqpb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// console.log(uri)
function run() {
  try {
    const categoreData = client.db('categories').collection('categories-name')
    const categoreProdect = client.db('categories').collection('categories-prodect')
    const oredersCategore = client.db('categories').collection('oreders')
    const AllUsersAdmin = client.db('categories').collection('allusers')

    app.get('/categore', async (req, res) => {
      const quriy = {}
      const categories = categoreData.find(quriy)
      const result = await categories.toArray()
      res.send(result)
    })
    app.get('/prodect', async (req,res)=>{
      const quriy ={}
      const carsor =  categoreProdect.find(quriy)
      const result = await  carsor.toArray()
      res.send(result)
    })
    app.get('/prodect/:id', async (req,res)=>{
      const id = req.params.id 
      const quriy ={_id : ObjectId(id)}
      const carsor = await categoreProdect.findOne(quriy)
       res.send(carsor)
    })
    app.post('/prodect', async (req, res) => {
      const quriy = req.body
      const result = await  categoreProdect.insertOne(quriy)
      res.send(result)
    })

    app.get('/reqsell', async (req,res)=>{
      const quriy ={}
      const carsor =  oredersCategore.find(quriy)
      const result = await  carsor.toArray()
      res.send(result)
    })
    app.post('/reqsell', async (req, res) => {
      const quriy = req.body
      const result = await  oredersCategore.insertOne(quriy)
      res.send(result)
    })

    app.get('/allusers', async (req,res)=>{
      const role = req.query.role
      const query ={role : role}
      const carsor = AllUsersAdmin.find(query)
      const result = await  carsor.toArray()
      res.send(result)
    })
    app.post('/allusers', async (req, res) => {
      const quriy = req.body
      const result = await AllUsersAdmin.insertOne(quriy)
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