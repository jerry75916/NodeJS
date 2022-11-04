import express from "express";

import handleRefreshToken from "../controllers/refreshToken.js";
const refreshRouter = express.Router();
refreshRouter.route("/").get(handleRefreshToken);

export default refreshRouter;
