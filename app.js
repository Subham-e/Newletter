const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(express.static(__dirname+"/public"));   
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/index.html");
});

app.post('/',(req,res)=>{
   const Fname = req.body.Fname;
   const Lname = req.body.Lname;
   const Email = req.body.Email;
  

     //  unique Id : 
   var data = {
    members:[{
      email_address:Email,
      status:"subscribed",
      merge_fields:{
        FNAME : Fname,
        LNAME : Lname
      }
    }]
   }
   const jsonData = JSON.stringify(data);
   const url = "https://us9.api.mailchimp.com/3.0/lists/beb6f390fe";
   const options = {
    method:"POST",
    auth: "subham:fda3858d488dede8d3b99e6789085556-us9"
   }

  const request =  https.request(url, options,(respond)=>{
    if(respond.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    }else{
       res.sendFile(__dirname+"/failure.html");
    }
  })
   request.write(jsonData);
  request.end();
   
  console.log(request.statusCode)
})



app.listen(process.env.PORT | 3000, ()=>{
    console.log("Server is running on port 3000.")
})