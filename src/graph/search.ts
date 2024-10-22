import { PageNodeLoader } from "./pageNodeLoader";
import { LinkNodeLoader } from "./linkNodeLoader";

import { bfs } from "./bfs";

const pageNodeLoader = new PageNodeLoader();

pageNodeLoader.load().then(async () => {
  console.log();

  const linkNodeLoader = new LinkNodeLoader(pageNodeLoader.nodes);

  await linkNodeLoader.load();

  const startNode = linkNodeLoader.nodes.get("bread");
  const endNode = linkNodeLoader.nodes.get("argentina");

  const path = bfs(startNode!, endNode!);
  console.log(path);
});
