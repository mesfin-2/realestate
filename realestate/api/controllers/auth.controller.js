import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existedUser = await User.findOne({ username });
    if (existedUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with the new user object
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "credential Error" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Compare the user's password with the provided password
    const validPassword = await bcrypt.compare(password, existedUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // If user successfully logged in, generate a JWT token
    const token = jwt.sign({ id: existedUser._id }, process.env.JWT_SECRET);
    //remove password in response from the existed user
    const { password: pass, ...rest } = existedUser._doc;

    // Create a user object without the password
    // const userWithoutPassword = {
    //   id: existedUser._id,
    //   username: existedUser.username,
    //   email: existedUser.email,
    //   // Add other user properties as needed
    // };

    // Set the token into a cookie
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest); //everything except password
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "credential Error  " });
  }
};

export const google = async (req, res) => {
  const { email, photo } = req.body;
  try {
    // Check if the user exists
    const existedUser = await User.findOne({ email });
    // if (!existedUser) {
    //   return res.status(404).json({ message: "Invalid email or password" });
    // }
    if (existedUser) {
      const token = jwt.sign({ id: existedUser._id }, process.env.JWT_SECRET);
      //remove password in response from the existed user
      const { password: pass, ...rest } = existedUser._doc;
      // Set the token into a cookie
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest); //everything except password
    } else {
      //If no user found with that email,we generate password and username,Since password and username are
      // required from our user model, we generate a random password and username that user can change it later
      const generatedPassword = Math.random().toString(36).slice(-8); //0.89374jgkgjl=> last 8 digits
      const hashedPassword = bcrypt.hasg(generatedPassword, 10);

      const generatedUsername =
        req.body.name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);

      const newUser = new User({
        username: generatedUsername,
        email: email,
        password: hashedPassword,
        avatar: photo,
      });
      newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      //remove password in response from the existed user
      const { password: pass, ...rest } = existedUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest); //everything except password
    }
  } catch (error) {
    console.log("Can not signin");
  }
};

export const signout = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
