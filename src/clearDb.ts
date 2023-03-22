import { prisma } from "./prisma";

// using then() because there's no top level await yet in node's module system
prisma.link.deleteMany({}).then(() => {
  return prisma.page.deleteMany({});
});
