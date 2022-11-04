import express from "express";
const Registerrouter = express.Router();
import handleUser from "../controllers/registerController.js";

Registerrouter.route("/").post(handleUser);

export default Registerrouter;
