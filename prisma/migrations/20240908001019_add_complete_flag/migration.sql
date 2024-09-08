-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Page" ("id", "title") SELECT "id", "title" FROM "Page";
DROP TABLE "Page";
ALTER TABLE "new_Page" RENAME TO "Page";
CREATE UNIQUE INDEX "Page_title_key" ON "Page"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
