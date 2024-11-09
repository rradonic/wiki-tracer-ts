import express from "express";
import path from "path";

import { load } from "./graph/load";
import { bfs } from "./graph/bfs";

const app = express();
const port = 3000;

load().then((nodes) => {
  app.use("/dist", express.static(path.resolve(__dirname)));
  app.use("/public", express.static(path.resolve(__dirname + "/../public")));

  app.get("/", (_req, res) => {
    res.sendFile(path.resolve(__dirname + "/../public/index.html"));
  });

  app.get("/search", (req, res) => {
    nodes.forEach((node) => {
      node.previous = null;
      node.visited = false;
    });

    const startNodeName = req.query.startPage as string;
    const endNodeName = req.query.endPage as string;

    const startNode = nodes.get(startNodeName.toLowerCase());
    const endNode = nodes.get(endNodeName.toLowerCase());

    const path = bfs(startNode!, endNode!);

    res.json({ path: path.map((page) => page.name) });
  });

  app.get("/suggest", (req, res) => {
    const input = req.query.input as string;

    let suggestions: string[] = [];

    if (input.length > 2) {
      suggestions = [...nodes.keys()]
        .filter((title) => title.match(new RegExp(`^${input}`, "i")))
        .sort();
    }

    res.json({ suggestions });
  });

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
});
