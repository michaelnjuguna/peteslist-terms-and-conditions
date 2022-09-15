const express = require('express');
const port = 3000;
//const bodyParser = require('body-parser');

const app = express();
const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

mongoose
  .connect("mongodb://localhost:27017/termsDB", {})
  .then(() => {
   // console.log("Connected");
  })
  .catch((e) => {
   // console.log("Something is wrong", e);
  });

  const List = mongoose.model('List',{title:String});;

app.get('/',(req,res)=>{
    List.find({}, (err, termItems) => {
        if (err) {
        //  console.log("Something is wrong", err);
        } else {
          res.render("index", { termItems: termItems });
          // console.log("list found :", docs);
        }
      });
})
app.post('/',(req,res)=>{
 let termTitle = req.body.title;
 const listItem = new List({title:termTitle});
 listItem.save();
 res.redirect('/')
})
app.get('/administrator',(req,res)=>{
    res.render('administrator');
}) 
app.post('/delete',(req,res)=>{
    let termTitle = req.body.title;
    List.deleteOne({ title: termTitle }, (err) => {
        if (err) {
         // console.log(err);
        } else {
          //console.log(termTitle);
         // console.log("Successfully deleted");
        }
      });
      res.redirect("/");
})
app.get('/:customName',(req,res)=>{
    const customName = req.params.customName;
    //console.log(customName);
    if(customName == 'administrator'){
        res.redirect('/administrator');
    }else {
        res.redirect('/');
    }
})
app.listen(port,()=>{
   // console.log(`Server is running on port ${port}`);
}); 