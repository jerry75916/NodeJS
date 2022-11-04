import express from "express";
const Loginrouter = express.Router();
import handleAuth from "../controllers/authController.js";

Loginrouter.route("/").post(handleAuth);

export default Loginrouter;
