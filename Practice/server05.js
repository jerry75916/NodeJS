import http from "http";
import { EventEmitter as emit } from "events";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import logfile from "./LogEvent.js";
const __filename = fileURLToPath(import.meta.url);
// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

const fspromise = fs.promises;

class myemmit extends emit {}

const Emmiter = new myemmit();
Emmiter.on("log", (msg, filename) => logfile(msg, filename));
const PORT = process.env.PORT || 3500;

const saveFile = async (filePath, contentType, response) => {
  try {
    const Rawdata = await fspromise.readFile(
      filePath,
      !contentType.includes("image") ? "utf8" : ""
    );
    const data =
      contentType === "application/json" ? JSON.parse(Rawdata) : Rawdata;
    response.writeHead(filePath.includes("404.html") ? 404 : 200, {
      "Content-Type": contentType,
    });

    response.end(
      contentType === "application/json" ? JSON.stringify(data) : data
    );
  } catch (err) {
    Emmiter.emit("log", `${err.name}:${err.message}`, "reqLog.txt");
    response.statusCode = 500;
    response.end();
  }
};

const Server = http.createServer((req, res) => {
  Emmiter.emit("log", `${req.url}\t${req.method}`, "reqLog.txt");
  const extension = path.extname(req.url);
  let contentType;
  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }
  let filePath =
    contentType === "text/html" && req.url === "/" // home
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/" //最後一碼為/，中間有很多路徑
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html" // 最後一碼.html or 不是html的副檔名
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);
  if (!extension && req.url.slice(-1) !== "/") filePath += ".html"; //最後一碼只有名字

  const fileExist = fs.existsSync(filePath);

  if (fileExist) {
    saveFile(filePath, contentType, res);
  } else {
    //404
    //301 redirect

    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, {
          Location: "/new-page.html",
        });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, {
          Location: "/new-page.html",
        });
        red.end();
        break;
      default:
        saveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
        break;
    }
  }
});

Server.listen(PORT, console.log(`Server running at port:${PORT}`));
