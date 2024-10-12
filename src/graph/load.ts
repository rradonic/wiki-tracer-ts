import { PageNodeLoader } from "./pageNodeLoader";
import { LinkNodeLoader } from "./linkNodeLoader";

const pageNodeLoader = new PageNodeLoader();

pageNodeLoader.load().then(() => {
  console.log();

  const linkNodeLoader = new LinkNodeLoader(pageNodeLoader.nodes);
  linkNodeLoader.load();
});
