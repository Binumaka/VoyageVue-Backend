const Booking = require("../model/bookingModel");

const save = async(req, res, next) =>{
    try{
        const {
            user,
            destination,
            accommodation,
            checkInDate,
            checkOutDate,
            totalPrice
        } = req.body;

        const newBooking = new Booking({
          user,
          destination,
          accommodation,
          checkInDate,
          checkOutDate,
          totalPrice
        });

        await newBooking.save();
        res.status(201).json(newBooking)
    }
    catch(error){
        next(error)
    }
}

module.exports ={save};