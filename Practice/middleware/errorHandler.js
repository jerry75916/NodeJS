import logfile from "../LogEvent.js";
const errorHandler = (err, req, res, next) => {
  logfile(`${err.name}: ${err.message}`, "errLog.txt");
  console.log(err.stack);
  res.status(500).send(err.message);
};

export default errorHandler;
