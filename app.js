// import npm packages
const express    = require('express');
const mongoose   = require('mongoose');
const path       = require('path');
const XLSX       = require('xlsx');
const multer     = require('multer');

// import local mudule
const excelModel = require("./model/excelData");
const {storage , postXl } = require("./controller/postXlFile");


const upload = multer({ storage: storage });

//connect to db
mongoose.connect('mongodb://127.0.0.1:27017/Demoexcel')
.then(()=>{console.log('connected to db')})
.catch((error)=>{console.log('error',error)});

//init app
const app = express();

//set the template engine
app.set('view engine','ejs');

//fetch data from the request
app.use(express.json());

//static folder path
app.use(express.static(path.resolve(__dirname,'public')));

// home page
app.get('/',(req,res)=>{
   excelModel.find({}).then(function(data){
    
    res.render("home" , {result:data});
    if(data)
    res.render("upload" );
   })
   .catch(function(err){
    console.log(err);
   })
   
});

app.get("/upload" , (req , res)=>{
    res.render("upload");
})

//import from controller 
app.post("/" , upload.single("excel") , postXl);

//assign port
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at '+port));