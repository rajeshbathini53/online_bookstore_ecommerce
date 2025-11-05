import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
name: {
    type:String ,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:
{
    type:String,
    required:true
},
confirmPassword:{
    type:String,
    required:true
},
role:{
    type:String,
    enum:['admin','user'],
    default:'user'
}
})
export default mongoose.model("User",UserSchema);
