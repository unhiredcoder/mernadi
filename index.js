// var r=require("http");
// const server=r.createServer((req,res)=>{
//     res.end("maruuuu")
// })

// server.listen(4000,"localhost",()=>{
//     console.log("hiii bro")
// })

// var t=require("fs")
// t.writeFileSync("./sample.txt","i am sampl textrrrrr inside text file")


// var t=require("fs")
// t.readFile("./sample.txt","utf-8",(req,res)=>{
//     console.log(res)
// })

// let y=require("path")
// console.log(y.extname("/node/index.js"))

// var o=require("os")
// console.log(o.freemem/1024/1024/1024)

// app.get("/about",(req,res)=>{
//     res.send("<h1>kya jan na hai ?</h1>")
// })
// app.get("/home",(req,res)=>{
//     res.send("<h1>ghar pr swagat hai </h1>")
// })

// app.get('*', (req, res) => {
//     res.status(404).send('Sorry, the requested page does not exist');
//   });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const express=require("express")
require('dotenv').config();
const mongoose=require("mongoose")
const Phone=require("./user")
const app=express();
// const fs = require('fs');
let path=require("path")
const cors = require('cors');
app.use(cors({
  origin: '*'
}));
const url=process.env.URL;
console.log(url)



// app.use(express.json())        //this is used otherwise u get error like name is not found while destructuring 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
  
// body-parser.json() is used to parse JSON data in the request body, 
// whereas body-parser.urlencoded() is used to parse form data in the request body.

//$$$$$$$$$$$  here started whole jsfile send operation $$$$$$$$$$$$$$$$$$$$$$
// const phonesData = require('./phones.json');
// console.log(phonesData.phones)
// const jsonData = JSON.parse(fs.readFileSync(jsonFile)); 

// Phone.insertMany(phonesData.phones)
//   .then(() => {
//     console.log(`Saved all phones to the database`);
//   })
//   .catch((error) => {
//     console.error(error);
//   });








app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname + "/index.html" ))
})


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true } )

.then(() => console.log('Connected Successfully'))

.catch((err) => { console.error(err); });

// app.get("/user",(req,res)=>{
// user.find().then((user1)=>{    //same like below but better use .then is more profitable then async await
// console.log(user1)
// })
// })


app.set('view engine','ejs')
app.get("/phones", async (req, res) => {
  try {
    const phones = await Phone.find();
    // res.send(user1)     
    res.render("hiii", { phones });  // either user.send(user1) or this called cannot called at the same time call what u need 
    //hiii.ejs is the file name inside view folder  & user1 is the content which pass as a prop
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});



app.get('/json', async (req, res) => {
  try {
    const users = await Phone.find();
    res.send(users)
} catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong' });
  }
});





  
  



app.post('/insert', async (req, res) => {
  const { brand, name, price,image } = req.body;
  const existingUser = await Phone.findOne({ name });
  if (existingUser) {
    console.log('Username already exists in the database!');
    return res.status(400).send('Username already exists in the database!');
  } else {
    try {
      const data = new Phone({
        name: name,    // add a new property to the schema
        brand: brand,
        price: price,
        image: image
      });
      await data.save();
      res.send(
        `<a href="/">Data saved successfully, now go home</a>  or <a href="/phones">go to user111</a>  or <a href="/json">user</a>  `
      );
    } catch (error) {
      console.error(error);
      res.status(500).send('Error saving data!');
    }
  }
});





// app.patch("/update/:id", async (req, res) => {
//   try{
//     const id = req.params.id;    //every time ctrl+s in body json of thunderclient
//     const ok=await user.findByIdAndUpdate(id, req.body,{new:true});    //bodyparser.json() is important
//     res.json(ok);
//   }
//   catch(e){
//     console.log(e)
//   }
// });





  
app.listen(3000,()=>{
    console.log("server is working on port 3000")
})


// Read PDF file as buffer
// const fs=require("fs")
// const path = require('path');

// Replace 'file.pdf' with the name of your PDF file
// const pdfPath = path.join(__dirname, './mypdf.pdf');
// console.log('PDF path:', pdfPath);
// const o=fs.readFileSync(pdfPath)
// console.log(o)




