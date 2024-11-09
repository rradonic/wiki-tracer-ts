import { PageNodeLoader } from "./pageNodeLoader";
import { LinkNodeLoader } from "./linkNodeLoader";

const pageNodeLoader = new PageNodeLoader();

export async function load() {
  await pageNodeLoader.load();

  console.log();

  const linkNodeLoader = new LinkNodeLoader(pageNodeLoader.nodes);
  await linkNodeLoader.load();

  console.log();

  return linkNodeLoader.nodes;
}
