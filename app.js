const express=require("express")
const bodyParser=require("body-parser")
const Router=require("./route")
// express server 
const app=express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
app.use("/api/v1",Router)
const port=4500;
app.listen(port,()=>[
    console.log("server is running on port",port)
])
