const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "djnlawnflasiscazij"

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGODB_URL);

app.get("/test", (req, res) => {
  res.json("test ok");
});
//TraKuqnOsSpjLI5P
app.post("/register", async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json({ userDoc });
  } catch (error) {
    res.status(422).json(error);
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOK = bcrypt.compareSync(password, userDoc.password)
    if (passOK){
      jwt.sign({email:userDoc.email, id:userDoc._id},jwtSecret,{}, (err,token) =>{
        if(err) throw err;
        res.cookie("token", token).json(userDoc);
      });
      
    }
    else{
      res.status(422).json("Pass not ok");
    }
  } else {
    res.json("not found");
  }
});
app.listen(4000);