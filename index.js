import express from "express"
import axios from "axios"
import bodyparser from "body-parser"
var app=express()
app.get("/",(req,res)=>{
    res.render("index.ejs")
})
var port=3001
app.use(bodyparser.urlencoded({extended:true}));
app.post("/submit",async(req,res)=>{
var type=req.body.theme;
console.log(type)
if(type===""){
    const response=await axios.get(`https://v2.jokeapi.dev/joke/any`)
    if(response.data.type==="single"){
        res.render("index.ejs",{category:response.data.category,type:response.data.type,joke:response.data.joke})
    }
    else if(response.data.type==="twopart"){
    res.render("index.ejs",{category:response.data.category,type:response.data.type,
        setup:response.data.setup,delivery:response.data.delivery})}
}
try{
const response=await axios.get(`https://v2.jokeapi.dev/joke/${type}`)
if(response.data.type==="single"){
    res.render("index.ejs",{category:response.data.category,type:response.data.type,joke:response.data.joke})
}
else if(response.data.type==="twopart"){
res.render("index.ejs",{category:response.data.category,type:response.data.type,
    setup:response.data.setup,delivery:response.data.delivery})}
}
catch(error){
console.log(error);
}});
app.listen(port,()=>{
    console.log(`app is running on the port ${port}`);
})