// import { default as datas } from "../model/users.json" assert { type: "json" };
// import fs from "fs";
// import path from "path";

import bcrypt from "bcrypt";
import mongooseUserSchema from "../model/User.js";
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

const handleUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    res.status(400).json({ message: "UserName or Password is required" });
  }
  const checkDuplicateUser = await mongooseUserSchema
    .findOne({ username: user })
    .exec();
  if (checkDuplicateUser) {
    res.sendStatus(409);
  } else {
    try {
      const hashPwd = await bcrypt.hash(pwd, 10);

      const result = await mongooseUserSchema.create({
        username: user,
        password: hashPwd,
      });

      // UserDb.setUsers([...UserDb.users, newUser]);
      // await fspromises.writeFile(
      //   path.join(__dirname, "..", "model", "users.json"),
      //   JSON.stringify(UserDb.users)
      // );
      res.status(201).json({ Success: `New user ${user} is ccreated` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

export default handleUser;
