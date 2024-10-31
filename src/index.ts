import express from "express";
import path from "path";

const app = express();
const port = 3000;

app.use("/dist", express.static(path.resolve(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/../src/pages/index.html"));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
