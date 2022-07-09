-- CreateTable
CREATE TABLE "Nationality" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "abbreviation" TEXT NOT NULL,
    "voteCount" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Nationality_abbreviation_key" ON "Nationality"("abbreviation");
