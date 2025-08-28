// const mongoose = require("mongoose");
// const DB = process.env.DATABASE;
// mongoose
//   .connect(DB)
//   .then(() => console.log("database connected successfully"))
//   .catch((error) =>
//     console.log("database not connected to successfully" + error.message)
//   );

// connection.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE); // options hata diye, v4+ driver automatically handle karega
    console.log("Connected to MongoDB Atlas successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
