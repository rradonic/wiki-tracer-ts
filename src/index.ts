import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/../src/pages/index.html");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
