import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  const users = await User.find({});
  try {
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res, next) => {
  // Authorization check
  if (req.user.id !== req.params.id) {
    return res
      .status(403)
      .json({ message: "You can only update your own account!" });
  }

  try {
    const existingUser = await User.findById(req.params.id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update logic (hash password if needed)
    if (req.body.password) {
      req.body.password = bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      //   req.params.id,
      //   {
      //     $set: req.body, // Update all provided fields
      //   },
      //   { new: true }
      // );
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  //req.user is coing from verifyToken
  if (req.user.id !== req.params.id) {
    return res
      .status(403)
      .json({ message: "You can only delete your own account!" });
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    next(error);
  }
};
