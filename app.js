require("dotenv").config();
const express= require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

    const city =req.body.city;
    const APIKey=process.env.API_KEY;
    
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+APIKey+"&units=metric";
    https.get(url,function(response){
        console.log(res.statusCode);
        response.on("data",function(data){
            const weatherInfo=JSON.parse(data);
            const temp=weatherInfo.main.temp;
            const description=weatherInfo.weather[0].description;
            const imgWeather=weatherInfo.weather[0].icon;

            res.write("<h1>The temperature in "+city+" is: "+temp+" degrees celsius</h1>");
            res.write("<h2>The weather is "+description+"</h2>");
            res.write("<img src= http://openweathermap.org/img/wn/"+imgWeather+"@2x.png>");
            res.send();
        });
       
    
});
    
});


app.listen(3002,function(){
    console.log("App started at port 3002");
});