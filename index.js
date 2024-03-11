const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require ('dotenv').config();
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const bcryptSalt = bcrypt.genSalt(10);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGODB_URL);

app.get('/test',(req,res)=>{
    res.json('test ok');
})
//TraKuqnOsSpjLI5P
app.post('/register', async (req,res)=>{
    const {name,password,email} = req.body;
    await User.create({
        name,
        email,
        password: bcrypt.hashSync(password,bcryptSalt)
    });
    res.json({name,password,email});
})
app.listen(4000)