const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
       type: String,
       require:true
    },
    email: {
        type:String,
        unique:true
    },
    password: {
      type:String,
      require:true
    },
    role: {
      type: String,
      required: true,
    }
});

const UserModel = mongoose.model("User",userSchema);
module.exports=UserModel;