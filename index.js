const app = require("./app");
const mongoose = require("mongoose");

const PORT = 3000;

//connectDB
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/userDB");
    console.log("db is connected");
  } catch (error) {
    console.log("db is connected");
    console.log(error.message);
    process.exit(1);
  }
};

app.listen(PORT, async (req, res) => {
  console.log(`server is running at http://localhost:${PORT}`);
  await connectDB();
});
