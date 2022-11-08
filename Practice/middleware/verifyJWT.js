import Jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  console.log(authHeader); // Bearer token
  const token = authHeader.split(" ")[1]; //Authorization: 'Bearer ' + token
  Jwt.verify(token, process.env.ACCESS_TOKEN_SECRIT, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;

    next();
  });
};

export default verifyJWT;
