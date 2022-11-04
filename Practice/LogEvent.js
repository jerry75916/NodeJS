import path from "path";
import { compareAsc, format } from "date-fns";
import { v4 as uuid } from "uuid";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
const fs_promise = fs.promises;

const logfile = async (msg, fileName) => {
  const id = uuid();
  const datatime = `${format(new Date(), "yyyy/MM/dd HH:mm:ss")}`;

  const newData = id + " " + msg + " " + datatime + "\n\n";

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fs_promise.mkdir(path.join(__dirname, "logs"));
    }
    await fs_promise.appendFile(
      path.join(__dirname, "logs", fileName),
      newData
    );
  } catch (e) {
    console.log(e);
  }
};

export const writeLog = (req, res, next) => {
  logfile(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  next();
};

export default logfile;
