// Happy coding guys

const express = require("express");
const app = express();
const port = 3000;
const Routes = require("./route/index");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/", Routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

