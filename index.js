const express = require("express");
const app = express();
const apiRouter = require("./Routes");
const PORT = process.env.PORT || 5000;

app.use(express.json());
const { client } = require("./db");
const morgan = require("morgan");

app.use(morgan("dev"));

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Server Error" });
});
app.listen(PORT, () => {
  console.log(`App is up on port ${PORT}`);
  client.connect();
});
