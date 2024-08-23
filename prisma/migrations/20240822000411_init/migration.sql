-- CreateTable
CREATE TABLE "Page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Link" (
    "fromId" INTEGER NOT NULL,
    "toId" INTEGER NOT NULL,

    PRIMARY KEY ("fromId", "toId"),
    CONSTRAINT "Link_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "Page" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Link_toId_fkey" FOREIGN KEY ("toId") REFERENCES "Page" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Page_title_key" ON "Page"("title");
