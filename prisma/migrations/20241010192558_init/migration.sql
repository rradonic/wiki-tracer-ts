-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "complete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Page_title_key" ON "Page"("title");

-- CreateIndex
CREATE INDEX "Page_complete_idx" ON "Page"("complete");

-- CreateIndex
CREATE INDEX "Link_from_idx" ON "Link"("from");

-- CreateIndex
CREATE INDEX "Link_to_idx" ON "Link"("to");
