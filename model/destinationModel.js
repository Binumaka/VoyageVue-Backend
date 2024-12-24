const mongoose = require("mongoose")

const destinationSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },

    category:{
        type:String,
        require:true
    },

    image:{
        type:String,
        require:true
    },

    description:{
        type:String,
        require:true
    }
})

const Destination = mongoose.model("destination", destinationSchema)

module.exports=Destination;