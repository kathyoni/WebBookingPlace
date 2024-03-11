const mongoose = require("mongoose");

// Định nghĩa schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Tạo model từ schema
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
