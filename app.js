const express= require("express")
const path = require("path");
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
const bucketlistRoutes = require("./routes/bucket-listRoutes");

connectDB();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

app.use("/api/user",userRoutes);
app.use("/api/destination",destinationRoute);
app.use("/api/accommodation",AccommodationRoute);
app.use("/api/booking",bookingRoute);
app.use("/api/auth",authRoute);
app.use("/api/guides",guideRoutes);
app.use("/api/packages",TourpackagesRoute);
app.use('/api/bucket-list', bucketlistRoutes);
app.use('/destinations_image', express.static("destinations_image"));
app.use('/uploads', express.static("uploads"));
// app.use(express.static(path.join(__dirname, "uploads")));

const port = 3000;
app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})