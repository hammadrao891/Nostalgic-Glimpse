const mongoose=require("mongoose")
const Schema=mongoose.Schema
const UserSchema=Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    email:
    {
        type:String,
        required:true,
    },
    password:{
        unique:true,
        type:String,
        required:true,
        min:3,
        max:20
    },
    profilePicture:{
        type:String,
        default:""
    },
    friends:{
        type:Array,
        default:[]
    },
    country:{
        type:String,
        // required:true,
    },
    cityBefore:
    {
        type:String,
        // required:true,
    },
    cityPresent:{
        type:String,
        require:true,
        // default:""
    }
},{timestamps:true});
module.exports=mongoose.model("User", UserSchema)