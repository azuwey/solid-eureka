-- CreateTable
CREATE TABLE "Nationality" (
    "id" SERIAL NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "voteCount" INTEGER NOT NULL,

    CONSTRAINT "Nationality_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nationality_abbreviation_key" ON "Nationality"("abbreviation");
