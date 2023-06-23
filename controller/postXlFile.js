const multer     = require('multer');
const XLSX       = require('xlsx');
const excelModel = require("../model/excelData");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  

const postXl = (req,res)=>{
    var workbook =  XLSX.readFile(req.file.path);
    var sheet_namelist = workbook.SheetNames;
    var x=0;
    sheet_namelist.forEach(element => {
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
        console.log(xlData);
        excelModel.insertMany(xlData)
        .then(function(){
          console.log("Successfully saved defult items to DB");
        })
        .catch(function (err) {
          console.log(err);
        });
        x++;
    });
    res.redirect('/');
}

module.exports = {storage , postXl};

