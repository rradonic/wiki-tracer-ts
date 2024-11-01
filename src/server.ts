import express from "express";
import path from "path";

import { load } from "./graph/load";
import { bfs } from "./graph/bfs";

const app = express();
const port = 3000;

load().then((linkNodeLoader) => {
  app.use("/dist", express.static(path.resolve(__dirname)));

  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../src/pages/index.html"));
  });

  app.get("/search", (req, res) => {
    const nodes = linkNodeLoader.nodes;

    nodes.forEach((node) => {
      node.previous = null;
      node.visited = false;
    });

    const startNode = nodes.get(req.query.startPage as string);
    const endNode = nodes.get(req.query.endPage as string);

    const path = bfs(startNode!, endNode!);

    res.json({ path: path.map((page) => page.name) });
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
