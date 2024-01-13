const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const userSchema = require("./model/userSchema");
const jwt = require("jsonwebtoken");
const passport = require("passport");
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.listen(process.env.PORT, (req, res) => {
  console.log(`all ok ${process.env.PORT}`);
});

require("./config/database");
require("./config/MyPassport");


//!register route
app.post("/register", async (req, res) => {
  try {
    const exist = await userSchema.findOne({ username: req.body.username });

    if (exist) return res.status(400).send("user exists");

    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const newb = new userSchema({
        username: req.body.username,
        password: hash,
      });
      await newb
        .save()
        .then((exist) => {
          res.send({
            success: true,
            message: "user  created successfully",
            exist: {
              id: exist._id,
              username: exist.username,
            },
          });
        })
        .catch((error) => {
          res.send({
            success: false,
            message: "user is not created",
            error: error,
          });
        });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//!login route
app.post("/login", async (req, res) => {
  const user = await userSchema.findOne({ username: req.body.username });
  if (!user) {
    return res.status(401).send({
      success: false,
      message: "user not found",
    });
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).send({
      success: false,
      message: "incorrect possword",
    });
  }

  const payload = {
    id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, process.env.MY_SECRET_KEY, {
    expiresIn: "7d",
  });
  return res.status(200).send({
    success: true,
    message: "logged in successfully",
    token: "Bearer" + token,
  });
});

//!profile route
// app.get(
//   "/profile",
//   passport.authenticate("jwt", { session: false }),
//   function (req, res) {
//     return res.status(200).send({
//       success: true,
//       user: {
//         id: req.user._id,
//         username: req.user.username,
//       },
//     });
//   }
// );

//!server error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

