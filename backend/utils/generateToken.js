import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userDetail, res) => {
  const token = jwt.sign({ ...userDetail }, process.env.JWT_SECRET, { expiresIn: "15d" });

  // return as cookies
  res.cookie("jwtToken", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // milliseconds
    httpOnly: true, // prevent xss attacks / cross-site scripting attacks
    sameSite: "strict", // CSRF attack protection / cross-site request forgery attecks protection
    secure: process.env.NODE_ENV !== "development",
  });

  return token;

  // jwtToken name can be changed
  // 15 days, 24 hour, 60 minutes, 60 seconds, 1000 milliseconds
  // httpOnly: true, it means it can be only accessed by http not javaScript.
}

export default generateTokenAndSetCookies;

/**
 * openssl rand -base64 32  
 * => this command is use to generate the secret key
 * 
 */