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

    image: {
      type: String,
      default: null,
    },
    
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    }
});

const UserModel = mongoose.model("user",userSchema);
module.exports=UserModel;