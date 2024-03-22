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
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const existedUser = await User.findOne({ email });
    if (!existedUser) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // Compare the user's password with the provided password
    const validPassword = await bcrypt.compare(password, existedUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // If user successfully logged in, generate a JWT token
    const token = jwt.sign({ id: existedUser._id }, process.env.JWT_SECRET);

    // Create a user object without the password
    const userWithoutPassword = {
      _id: existedUser._id,
      username: existedUser.username,
      email: existedUser.email,
      // Add other user properties as needed
    };

    // Set the token into a cookie
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
