const mongoose = require("mongoose")

const destinationSchema = new mongoose.Schema({
    title:{
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
    image1:{
        type:String,
        require:true
    },
    image2:{
        type:String,
        require:true
    },

    bestTimeToVisit:{
        type:String,
        require:true
    },
    
    location:{
        type:String,
        require:true
    },

    description:{
        type:String,
        require:true
    },
    section: {
        type: String,
        required: true,
    }
})

const Destination = mongoose.model("destination", destinationSchema)

module.exports=Destination;