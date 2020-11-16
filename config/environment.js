const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "some_secret_key",
  db: "rent_space",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "mailer.droidx",
      pass: "Never@0%",
    },
  },
  google_client_id:
    "24998187095-kstrc7vav2r478ug8ldn8pctanm4gd4o.apps.googleusercontent.com",
  google_client_secret: "r-B17be7Dos-W-zbRriRoiKn",
  google_callback_url: "http://localhost:8000/auth/google/callback",
  jwt_secret: "super-secret-key",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: process.env.RENT_SPACE_ENVIRONMENT,
  asset_path: process.env.RENT_SPACE_ASSET_PATH,
  session_cookie_key: process.env.RENT_SPACE_SESSION_COOKIE_KEY,
  db: process.env.RENT_SPACE_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.RENT_SPACE_GMAIL_USERNAME,
      pass: process.env.RENT_SPACE_GMAIL_PASSWORD,
    },
  },
  google_client_id: process.env.RENT_SPACE_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.RENT_SPACE_GOOGLE_CLIENT_SECRET,
  google_callback_url: process.env.RENT_SPACE_GOOGLE_CALLBACK_URL,
  jwt_secret: process.env.RENT_SPACE_JWT_SECRET,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

module.exports = development;
// module.exports =
//   eval(process.env.RENT_SPACE_ENVIRONMENT) == undefined
//     ? development
//     : eval(process.env.RENT_SPACE_ENVIRONMENT);
