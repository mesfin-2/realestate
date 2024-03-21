import User from "../models/user.model.js";

const getUsers = (req, res) => {
  //const users = await User.find({});
  try {
    res.json({ message: "Test succesfull" });
  } catch (error) {
    console.log(error);
  }
};

export default getUsers;
