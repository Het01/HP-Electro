const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config()
const app = express();
const port = process.env.PORT || 5000;

const corsOptions ={
  origin:['https://hp-electro-frontend.vercel.app'],
  methods: ["GET","POST","PUT","DELETE"],
  credentials:true
}

const mongoDB = require('./db');
mongoDB();

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.use(express.json())
app.use(cors(corsOptions))
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
