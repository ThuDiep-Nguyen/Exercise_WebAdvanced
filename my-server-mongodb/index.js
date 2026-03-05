const express = require('express'); 
const app = express(); 
const port = 3002; 

const morgan=require("morgan") 
app.use(morgan("combined")) 

const bodyParser=require("body-parser") 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

const cors=require("cors"); 
app.use(cors()) 
app.listen(port,()=>{ 
    console.log(`My Server listening on port ${port}`) 
}) 
app.get("/",(req,res)=>{ 
    res.send("This Web server is processed for MongoDB") 
}) 

const { MongoClient, ObjectId } = require('mongodb'); 
client = new MongoClient("mongodb://127.0.0.1:27017"); 
client.connect(); 
database = client.db("FashionData");       
fashionCollection = database.collection("Fashion"); 

app.get("/fashions",cors(),async (req,res)=>{    
    const result = await fashionCollection.find({}).toArray(); 
    res.send(result) 
})
app.get("/fashions/:id",cors(),async (req,res)=>{ 
var o_id = new ObjectId(req.params["id"]); 
const result = await fashionCollection.find({_id:o_id}).toArray();     
res.send(result[0]) 
} 
) 