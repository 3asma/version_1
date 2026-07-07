-- CreateEnum
CREATE TYPE "LearningMode" AS ENUM ('MONOME', 'BINOME', 'GROUPE');

-- CreateEnum
CREATE TYPE "InscriptionStatus" AS ENUM ('WAITING', 'ASSIGNED', 'ACTIVE', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('MONOME', 'BINOME', 'GROUPE');

-- CreateTable
CREATE TABLE "Formation" (
    "id" TEXT NOT NULL,
    "matiere" TEXT NOT NULL,
    "niveau" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'individual',
    "duration" INTEGER NOT NULL DEFAULT 60,
    "totalSessions" INTEGER NOT NULL DEFAULT 1,
    "prix" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "volumeHoraire" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Formation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "capacite" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Individuel',
    "available" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT,
    "telephone" TEXT,
    "adresse" TEXT,
    "specialite" TEXT,
    "type" TEXT NOT NULL DEFAULT 'permanent',
    "dayOff" TEXT NOT NULL DEFAULT 'Sunday',
    "maxSessions" INTEGER NOT NULL DEFAULT 25,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inscription" (
    "id" TEXT NOT NULL,
    "dateInscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "InscriptionStatus" NOT NULL DEFAULT 'WAITING',
    "note" TEXT,
    "duration" INTEGER,
    "price" DOUBLE PRECISION,
    "volumeHoraire" INTEGER,
    "remainingHours" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "learningMode" "LearningMode" NOT NULL DEFAULT 'GROUPE',
    "groupId" TEXT,
    "candidateId" TEXT NOT NULL,
    "formationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "type" "GroupType" NOT NULL,
    "formationId" TEXT NOT NULL,
    "professorId" TEXT,
    "effectif" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupCandidate" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupCandidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commercial" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "action" TEXT NOT NULL DEFAULT 'action1',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commercial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_numero_key" ON "Room"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");

-- CreateIndex
CREATE INDEX "Inscription_candidateId_idx" ON "Inscription"("candidateId");

-- CreateIndex
CREATE INDEX "Inscription_formationId_idx" ON "Inscription"("formationId");

-- CreateIndex
CREATE INDEX "Group_formationId_idx" ON "Group"("formationId");

-- CreateIndex
CREATE INDEX "Group_professorId_idx" ON "Group"("professorId");

-- CreateIndex
CREATE INDEX "GroupCandidate_groupId_idx" ON "GroupCandidate"("groupId");

-- CreateIndex
CREATE INDEX "GroupCandidate_candidateId_idx" ON "GroupCandidate"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupCandidate_groupId_candidateId_key" ON "GroupCandidate"("groupId", "candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "Commercial_email_key" ON "Commercial"("email");

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_formationId_fkey" FOREIGN KEY ("formationId") REFERENCES "Formation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_formationId_fkey" FOREIGN KEY ("formationId") REFERENCES "Formation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupCandidate" ADD CONSTRAINT "GroupCandidate_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupCandidate" ADD CONSTRAINT "GroupCandidate_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

