const whitelist = [
  "https://www.google.com.tw",
  "http://localhost:5050",
  "http://localhost:3500",
];
const options = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allow by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

export default options;
