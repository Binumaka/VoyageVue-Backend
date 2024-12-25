const express= require("express")
const connectDB= require("./config/db")
const app= express();
const userRoutes= require("./routes/userRoutes");
const destinationRoute = require("./routes/destinationRoutes");
const AccommodationRoute = require("./routes/accommodationRoutes");

connectDB();

app.use(express.json());

app.use("/api/user",userRoutes);
app.use("/api/destination",destinationRoute);
app.use("/api/accommodation",AccommodationRoute)

const port = 3000;
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})