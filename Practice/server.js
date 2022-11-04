import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import options from "./Config/config.js";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import logfile, { writeLog } from "./LogEvent.js";
import router from "./routes/route.js";
import subrouter from "./routes/subdir.js";
import employeeRouter from "./routes/api/employees.js";
import Registerrouter from "./routes/register.js";
import Loginrouter from "./routes/auth.js";
import verifyJWT from "./middleware/verifyJWT.js";
import crypto from "crypto";
import cookieParser from "cookie-parser";
import refreshRouter from "./routes/refresh.js";
import logOutRouter from "./routes/logout.js";
import credentials from "./middleware/credentials.js";
const PORT = process.env.PORT || 3500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const server = express();

server.use(writeLog);
server.use(credentials);
server.use(cors(options));

server.use(express.urlencoded({ extended: false }));

server.use(express.json());
server.use(cookieParser());
server.use("/", express.static(path.join(__dirname, "./public")));
server.use("/", router);
server.use("/register", Registerrouter);
server.use("/auth", Loginrouter);
server.use("/refresh", refreshRouter);
server.use("/logout", logOutRouter);
server.use(verifyJWT); //登入用
server.use("/employees", employeeRouter);

// const one = (req, res, next) => {
//   console.log("one");
//   next();
// };
// const two = (req, res, next) => {
//   console.log("one");
//   next();
// };
// const three = (req, res, next) => {
//   console.log("finish");
//   res.send("Haha");
// };

// server.get("/chain(.html)?", [one, two, three]);

server.get("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});
server.use(errorHandler);
server.listen(PORT, () => console.log(`server is on http://localhost:${PORT}`));
