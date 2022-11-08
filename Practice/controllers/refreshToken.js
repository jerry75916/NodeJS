// import { default as datas } from "../model/users.json" assert { type: "json" };
// import fs from "fs";
// import path from "path";
import Jwt from "jsonwebtoken";
import mongooseUserSchema from "../model/User.js";
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// // dotenv.config();

// let UserDb = {
//   users: datas,
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

const handleRefreshToken =async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await mongooseUserSchema
  .findOne({ refreshToken: refreshToken })
  .exec();
  if (!foundUser) {
    return res.status(401).json({ message: "UserName is not in Db" });
  } else {
    Jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRIT,
      (err, decode) => {
        if (err || foundUser.username !== decode.username) {
          return res.sendStatus(403);
        }
        const roles = Object.values(foundUser.roles);
        const accessToken = Jwt.sign(
          { UserInfo: { username: foundUser.username, roles: roles } },
          process.env.ACCESS_TOKEN_SECRIT,
          { expiresIn: "60s" }
        );

        return res.json({ accessToken: accessToken });
      }
    );
  }
};

export default handleRefreshToken;
