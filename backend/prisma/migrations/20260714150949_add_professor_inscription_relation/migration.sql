-- AlterTable
ALTER TABLE "Inscription" ADD COLUMN     "professorId" TEXT;

-- CreateIndex
CREATE INDEX "Inscription_professorId_idx" ON "Inscription"("professorId");

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
