const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://saggarayush:27dQaNH1lbzzKlYp@cluster0.8rvr6mf.mongodb.net/movies")
.then(()=>{
    console.log("mongoDb connected");
})
.catch(()=>{
    console.log("Failed");
})

const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    }
})

const user=mongoose.model("user",newSchema);
module.exports=user;