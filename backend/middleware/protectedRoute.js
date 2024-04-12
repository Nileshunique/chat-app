import JWT from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No Token provided" });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    req.user = user;

    next();

  } catch (error) {
    console.log("error in protected route", error.message)
    return res.status(400).json({ error: "Internal server error" })
  }
}

export default protectedRoute;