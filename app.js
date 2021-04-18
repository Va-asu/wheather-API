const express=require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=express();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    

});
app.post("/",function(req,res){
    const query=req.body.city;
    const appkey="e9546e5e5bde0d9c30b6660a01208222";
    const unit="metrices";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appkey+"&unit="+unit;
    //we want data so using this https.get
    https.get(url,function(respond){
     // console.log(respond.statusCode);
    respond.on("data",function(data){
         const wheatherData=JSON.parse(data);
         console.log(wheatherData);
         const temp=wheatherData.main.temp;
         console.log(temp);
         console.log(wheatherData.weather[0].description);
         const icon=wheatherData.weather[0].icon;
         const image="http://openweathermap.org/img/wn/"+icon+"@4x.png";
      res.write("<p>desciption of the weather is "+wheatherData.weather[0].description+" like this  </p>")   
      res.write("<h1>temperture in "+query+" is"+temp+"in kelvin</h1>")
      res.write("<img src="+image+">");
     });
    });
     
});

app.listen(process.env.PORT||3000,function(){
console.log("server at 100");
});