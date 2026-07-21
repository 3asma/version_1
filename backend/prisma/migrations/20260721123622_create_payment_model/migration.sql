/*
  Warnings:

  - You are about to drop the column `firstContactId` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `membershipNumber` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `registrationDate` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `secondContactId` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `inscriptionCode` on the `Inscription` table. All the data in the column will be lost.
  - You are about to drop the column `learningGroupId` on the `Inscription` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `Inscription` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `firstContactId` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `membershipNumber` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `registrationDate` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the column `secondContactId` on the `Prospect` table. All the data in the column will be lost.
  - You are about to drop the `LearningGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reservation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subject` to the `Prospect` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('MONOME', 'BINOME', 'GROUPE');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'CARD', 'BANK_TRANSFER', 'CHEQUE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_firstContactId_fkey";

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_secondContactId_fkey";

-- DropForeignKey
ALTER TABLE "Inscription" DROP CONSTRAINT "Inscription_learningGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Inscription" DROP CONSTRAINT "Inscription_professorId_fkey";

-- DropForeignKey
ALTER TABLE "LearningGroup" DROP CONSTRAINT "LearningGroup_formationId_fkey";

-- DropForeignKey
ALTER TABLE "LearningGroup" DROP CONSTRAINT "LearningGroup_professorId_fkey";

-- DropForeignKey
ALTER TABLE "Prospect" DROP CONSTRAINT "Prospect_firstContactId_fkey";

-- DropForeignKey
ALTER TABLE "Prospect" DROP CONSTRAINT "Prospect_secondContactId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_inscriptionId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_professorId_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_roomId_fkey";

-- DropIndex
DROP INDEX "Candidate_membershipNumber_key";

-- DropIndex
DROP INDEX "Inscription_learningGroupId_idx";

-- DropIndex
DROP INDEX "Inscription_professorId_idx";

-- DropIndex
DROP INDEX "Prospect_email_key";

-- DropIndex
DROP INDEX "Prospect_membershipNumber_key";

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "firstContactId",
DROP COLUMN "gender",
DROP COLUMN "membershipNumber",
DROP COLUMN "registrationDate",
DROP COLUMN "secondContactId",
ADD COLUMN     "contact" TEXT[],
ADD COLUMN     "giftCode" TEXT;

-- AlterTable
ALTER TABLE "Formation" ADD COLUMN     "description" TEXT,
ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 60,
ADD COLUMN     "prix" DECIMAL(10,2) NOT NULL DEFAULT 0,
ADD COLUMN     "totalSessions" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'individual',
ADD COLUMN     "volumeHoraire" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Inscription" DROP COLUMN "inscriptionCode",
DROP COLUMN "learningGroupId",
DROP COLUMN "professorId",
ADD COLUMN     "groupId" TEXT;

-- AlterTable
ALTER TABLE "Prospect" DROP COLUMN "email",
DROP COLUMN "firstContactId",
DROP COLUMN "gender",
DROP COLUMN "membershipNumber",
DROP COLUMN "phone",
DROP COLUMN "registrationDate",
DROP COLUMN "secondContactId",
ADD COLUMN     "contact" TEXT[],
ADD COLUMN     "subject" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Individuel';

-- DropTable
DROP TABLE "LearningGroup";

-- DropTable
DROP TABLE "Reservation";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "ReservationStatus";

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
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "paymentCode" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "formationId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "Payment_paymentCode_key" ON "Payment"("paymentCode");

-- CreateIndex
CREATE INDEX "Payment_candidateId_idx" ON "Payment"("candidateId");

-- CreateIndex
CREATE INDEX "Payment_formationId_idx" ON "Payment"("formationId");

-- CreateIndex
CREATE INDEX "Payment_paymentDate_idx" ON "Payment"("paymentDate");

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

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_formationId_fkey" FOREIGN KEY ("formationId") REFERENCES "Formation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
