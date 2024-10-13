import { PageNodeLoader } from "./pageNodeLoader";
import { LinkNodeLoader } from "./linkNodeLoader";

const pageNodeLoader = new PageNodeLoader();

pageNodeLoader.load().then(async () => {
  console.log();

  const linkNodeLoader = new LinkNodeLoader(pageNodeLoader.nodes);

  await linkNodeLoader.load();

  console.log(linkNodeLoader.nodes);
});
