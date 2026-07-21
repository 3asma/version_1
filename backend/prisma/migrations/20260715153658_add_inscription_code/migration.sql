-- AlterTable
ALTER TABLE "Inscription" ADD COLUMN "inscriptionCode" TEXT;

-- Update existing records with unique sequential keys
WITH numbered_inscriptions AS (
  SELECT id,
         TO_CHAR("dateInscription", 'YYYY') AS yr,
         ROW_NUMBER() OVER (PARTITION BY EXTRACT(YEAR FROM "dateInscription") ORDER BY "dateInscription" ASC, id ASC) as seq
  FROM "Inscription"
)
UPDATE "Inscription"
SET "inscriptionCode" = 'INS-' || COALESCE(numbered_inscriptions.yr, '2026') || '-' || LTRIM(TO_CHAR(numbered_inscriptions.seq, '0000'))
FROM numbered_inscriptions
WHERE "Inscription".id = numbered_inscriptions.id;

-- Make column NOT NULL
ALTER TABLE "Inscription" ALTER COLUMN "inscriptionCode" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Inscription_inscriptionCode_key" ON "Inscription"("inscriptionCode");
