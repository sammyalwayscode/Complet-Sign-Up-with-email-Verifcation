const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
require("./utils/db");
const routPat = require("./router/userRouter");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Server up! 😁");
});

app.use("/api/user", routPat);

app.listen(PORT, () => {
  console.log(`Listning PORT: ${PORT}`);
});
