import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  //check if the user is already existed
  const existedUser = await User.findOne({ username });
  if (existedUser) {
    res.status(400).json("user already existed").end();
  }

  const saltRounds = 10;
  //hash password and save hashed password in db
  //we can use bcrypt.hashSync("password", saltRounds) to avoid await
  const passwordHash = await bcrypt.hash("password", saltRounds);

  const newUser = new User({
    username,
    email,
    password: passwordHash, //response username and hashed password
  });
  await newUser.save();
  res.status(201).json(newUser);
  //check if the length of username is > 3

  //generate jwt/sign && set expiredIn
  //response jwt and store browser/cookies
  //console.log(req.body);
};

export default signup;
