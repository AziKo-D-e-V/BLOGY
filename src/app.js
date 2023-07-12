const express = require("express");
require("dotenv/config");
const cors = require("cors");
const router = require("./routes");
const cookie = require("cookie-parser");

const fileUpload = require("express-fileupload");

const port = process.env.PORT || 5454;
const app = express();
app.use(express.static(process.cwd() + "/uploads"));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log("Port is working " + port);
});
