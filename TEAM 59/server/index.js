const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoute = require("./Routes/AuthRoute");
const studentRoute=require("./Routes/StudentRoute")
const sampleTest = require("./Routes/SampleTestsRouter");

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

// Log the JWT_SECRET to ensure it's being read correctly
console.log("JWT_SECRET:", JWT_SECRET);

// Initialize the app
const app = express();

mongoose
  .connect(MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
// app.get("/logout" ,(req,res,next) => {
//   console.log("here")
//   res.cookie("token" , "" , {maxAge : 1});
//   res.status(200).send();
// })
app.use("/", authRoute);
app.use("/student",studentRoute);
app.use("/test",sampleTest);



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});