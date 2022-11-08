// import { default as datas } from "../model/users.json" assert { type: "json" };
// import fs from "fs";
// import path from "path";
import mongooseUserSchema from "../model/User.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const fspromises = fs.promises;

// let UserDb = {
//   users: datas,
//   setUsers: function (data) {
//     this.users = data;
//   },
// };

const handlelogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await mongooseUserSchema.findOne({ username: user }).exec();
  if (!foundUser) {
    return res.status(401).json({ message: "UserName is not in Db" });
  } else {
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
      const roles = Object.values(foundUser.roles);
      const accessToken = Jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRIT,
        { expiresIn: "60s" }
      );
      const refreshToken = Jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRIT,
        { expiresIn: "1d" }
      );
      foundUser.refreshToken = refreshToken;
      const result = foundUser.save();

      // const otherUsers = datas.filter(
      //   (person) => person.username !== foundUser.username
      // );
      // const currentUser = { ...foundUser, refreshToken };
      // UserDb.setUsers([...otherUsers, currentUser]);
      // await fspromises.writeFile(
      //   path.join(__dirname, "..", "model", "users.json"),
      //   JSON.stringify(UserDb.users)
      // );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
        // secure: true,
      });
      return res.json({ accessToken: accessToken });
    } else {
      return res.sendStatus(401);
    }
  }
};
export default handlelogin;
