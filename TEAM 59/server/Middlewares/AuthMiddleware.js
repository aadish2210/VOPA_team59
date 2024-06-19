const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token received:", token);

  if (!token) {
    console.log("No token found in cookies.");
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      console.log("JWT verification error:", err.message);
      return res.json({ status: false });
    } else {
      try {
        const user = await User.findById(data.id);
        if (user) {
          console.log("User found:", user.username);
          req.user = user;
          next();
        } else {
          console.log("User not found in database.");
          return res.json({ status: false });
        }
      } catch (error) {
        console.log("Error finding user:", error.message);
        return res.json({ status: false });
      }
    }
  });
};
