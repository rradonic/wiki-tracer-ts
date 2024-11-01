import express from "express";
import path from "path";

import { load } from "./graph/load";

const app = express();
const port = 3000;

load().then((linkNodeLoader) => {
  app.use("/dist", express.static(path.resolve(__dirname)));

  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../src/pages/index.html"));
  });

  app.get("/search", (req, res) => {
    // const startNode = linkNodeLoader.nodes.get("bread");
    // const endNode = linkNodeLoader.nodes.get("bench press");

    // const path = bfs(startNode!, endNode!);
    // console.log(path.map((page) => page.name));

    res.json({ path: ["test1", "test2"], graphSize: linkNodeLoader.nodes.size });
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
