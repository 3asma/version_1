-- AlterTable
ALTER TABLE "Inscription" ADD COLUMN     "learningGroupId" TEXT;

-- CreateTable
CREATE TABLE "LearningGroup" (
    "id" TEXT NOT NULL,
    "groupName" TEXT NOT NULL,
    "inscriptionCode" TEXT NOT NULL,
    "learningMode" "LearningMode" NOT NULL,
    "formationId" TEXT NOT NULL,
    "professorId" TEXT,
    "dateInscription" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearningGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Inscription_learningGroupId_idx" ON "Inscription"("learningGroupId");

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_learningGroupId_fkey" FOREIGN KEY ("learningGroupId") REFERENCES "LearningGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningGroup" ADD CONSTRAINT "LearningGroup_formationId_fkey" FOREIGN KEY ("formationId") REFERENCES "Formation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearningGroup" ADD CONSTRAINT "LearningGroup_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
