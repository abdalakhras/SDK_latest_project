const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB connected successfully");
  } catch (error) {
    console.log(`Error : ${error.message}`);
    // console.log(process.env.MONGO_URI)
    process.exit(1);
  }
};
module.exports = connectDb;
