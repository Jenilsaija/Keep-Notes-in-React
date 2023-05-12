const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
//bcryptjs will use to secure the password.
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Jenilis$$good##boy";
var fetchuser=require('../middlleware/fetchuser')

// ROUTE-1 : Create a User using Post "api/auth/createuser".No Login Require.
router.post(
  "/createuser", //this below array is used to validate email,name and password.
  [
    body("email", "Please Enter a Valid Email").isEmail(),
    body("name", "Name must have 3 charechter").isLength({ min: 3 }),
    body("password", "Pssword must be greaterthen 5 charechter.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success=false;
    //If there are errors return bed request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check weather the user with this email exist alredy.
    try {
      //Hear we check User is alredy exist or Not.
      //If user Exists then it will send error message
      //Otherwise It Will Create a New User.
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry User with this email alredy exist." });
      }
      //Below line will generate the salt and bcrypt.hsah will generate the hash value of string.
      const salt = await bcrypt.genSalt(10); //that is asynchronous Function
      secPass = await bcrypt.hash(req.body.password, salt); //that is also asynchronous Function

      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      //It will send User in response after Insert into Databse.

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET); //this is synchrononuse function that function will use to generate the token.(In token we will paas data or signature)using signature we verify User.
      res.json({ success:true,authtoken });

      //To catch error.
    } catch (error) {
      console.error(error.message);
      res.status(500).send({success,error:"Internal server error"});
    }
  }
);

// ROUTE-2 : authentication a User using Post "api/auth/login".No Login Require.
router.post(
  "/login", //this below array is used to validate email and password.
  [
    body("email", "Please Enter a Valid Email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    let success=false;
    //If there are errors return bed request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success,error: "Please try to Login with Correct Credantials" });
      }

      const passwordcompare = await bcrypt.compare(password, user.password); //this function will compare user entered password with available hashin database. and that will return true or false.
      if (!passwordcompare) {
        return res
          .status(400)
          .json({ success,error: "Please try to Login with Correct Credantials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET); //this is synchrononuse function that function will use to generate the token.(In token we will paas data or signature)using signature we verify User.
      res.json({ success:true,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({success,error:"Internal server error"});
    }
  }
);

// ROUTE-3 : get loggedin User Details using Post "api/auth/getuser".Login Require.
router.post("/getuser",fetchuser,async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
