import { default as datas } from "../model/users.json" assert { type: "json" };
import fs from "fs";
import path from "path";

import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fspromises = fs.promises;
dotenv.config();

let UserDb = {
  users: datas,
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogout = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = datas.find((data) => data.refreshToken === refreshToken);
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  } else {
    const otherUser = UserDb.users.filter(
      (person) => person.username != foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken: "" };
    UserDb.setUsers([...otherUser, currentUser]);
    await fspromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(UserDb.users)
    );
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }
};

export default handleLogout;
