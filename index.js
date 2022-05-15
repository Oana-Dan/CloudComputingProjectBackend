const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const usersRouter = require("./router/usersRouter");
const historyRouter = require("./router/historyRouter");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", usersRouter);
app.use("/history", historyRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Cloud computing app listening on port " + port);
});
