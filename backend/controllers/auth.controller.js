import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookies from "../utils/generateToken.js";

export const signup = async (req, res, next) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password don't match" });
    }
    const user = await User.findOne({ username: username })
    if (user) {
      return res.status(400).json({ error: "Username Already exist" });
    }

    // hashing password here
    const salt = await bcrypt.genSalt(10); // the higher it is the better it is but the slower it is.
    const hashedPassword = await bcrypt.hash(password, salt)

    // https://avatar-placeholder.iran.liara.run/

    const maleProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const otherProfilePic = `https://avatar.iran.liara.run/public/${(password[0] % 2 === 0) ? "boy" : "girl"}?username=${username}`;

    const genderProfilePic = {
      "male": maleProfilePic,
      "female": femaleProfilePic,
      "other": otherProfilePic,
    }

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: genderProfilePic[gender]
    })

    if (newUser) {
      await newUser.save();
      const userDetail = userObj(newUser);

      const token = generateTokenAndSetCookies(userDetail, res)

      return res.status(201).json({ ...userDetail, token })
    } else {
      return res.status(400).json({ error: "Invalid user data" })
    }

  } catch (err) {
    console.error("Error in signup controller", err.message);
    res.status(500).json({ error: "Internal Server Error" })
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username })
    // if (!user) {
    //  return res.status(404).json({ error: "User not found" })
    // }

    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    if (!user || !isPasswordCorrect) {
      return res.status(404).json({ error: "Invlid Username or Password" })
    }
    const userDetail = userObj(user);
    const token = generateTokenAndSetCookies(userDetail, res);

    return res.status(201).json({ ...userDetail, token })
  } catch (err) {
    console.error("Error in login controller", err.message);
    res.status(500).json({ error: "Internal Server Error" })
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("jwtToken", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out Successfully" })
  } catch (err) {
    console.error("Error in logout controller", err.message);
    res.status(500).json({ error: "Internal Server Error" })
  }
};


const userObj = (user) => {
  return {
    _id: user._id,
    fullName: user.fullName,
    username: user.username,
    gender: user.gender,
    profilePic: user.profilePic,
  }
}