const express= require("express")
const cors = require("cors");
const connectDB= require("./config/db")
const app= express();
const userRoutes= require("./routes/userRoutes");
const destinationRoute = require("./routes/destinationRoutes");
const AccommodationRoute = require("./routes/accommodationRoutes");
const bookingRoute = require("./routes/bookingRoutes");
const authRoute = require("./routes/authRoutes");
const guideRoutes = require("./routes/guideRoutes");
const TourpackagesRoute = require("./routes/tourpackagesRoutes");
const wishlistRoutes = require("./routes/bucket-listRoutes");

connectDB();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

app.use("/api/user",userRoutes);
app.use("/api/destination",destinationRoute);
app.use("/api/accommodation",AccommodationRoute);
app.use("/api/bookings",bookingRoute);
app.use("/api/auth",authRoute);
app.use("/api/guides",guideRoutes);
app.use("/api/packages",TourpackagesRoute);
app.use('/api/wishlist', wishlistRoutes);

const port = 3000;
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})