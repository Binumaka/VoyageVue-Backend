const Booking = require("../model/bookingModel");

const save = async(req, res, next) =>{
    try{
        const {
            userId,
            destinationId,
            accommodationId,
            checkInDate,
            checkOutDate,
            totalPrice
        } = req.body;

        const newBooking = new Booking({
            userId,
            destinationId,
            accommodationId,
            checkInDate,
            checkOutDate,
            totalPrice
        });

        await newBooking.save();
        res.status(201).json(newBooking)
    }
    catch (e) {
        console.error("Error saving accommodation:", e);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports ={save};