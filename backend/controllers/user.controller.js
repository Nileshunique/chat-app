import User from "../models/user.model.js";

export const gerUsers = async (req, res, next) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")

    return res.status(201).json(filteredUsers)
  } catch (error) {
    console.log("Error in getting user", error.message);
    return res.status(500).json({ error: "Internal Server Error" })
  }
};