import { PageNodeLoader } from "./pageNodeLoader";
import { LinkNodeLoader } from "./linkNodeLoader";

import { bfs } from "./bfs";

const pageNodeLoader = new PageNodeLoader();

pageNodeLoader.load().then(async () => {
  console.log();

  const linkNodeLoader = new LinkNodeLoader(pageNodeLoader.nodes);

  await linkNodeLoader.load();

  console.log();

  const startNode = linkNodeLoader.nodes.get("bread");
  const endNode = linkNodeLoader.nodes.get("bench press");

  const path = bfs(startNode!, endNode!);
  console.log(path.map((page) => page.name));
});
