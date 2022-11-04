import express from "express";

import handleLogout from "../controllers/logoutController.js";
const logOutRouter = express.Router();
logOutRouter.route("/").get(handleLogout);

export default logOutRouter;
