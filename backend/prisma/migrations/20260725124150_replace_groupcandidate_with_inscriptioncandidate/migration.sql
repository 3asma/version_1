/*
  Warnings:

  - You are about to drop the column `effectif` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `formationId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `professorId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `groupId` on the `Inscription` table. All the data in the column will be lost.
  - You are about to drop the `GroupCandidate` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[inscriptionId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inscriptionId` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_formationId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_professorId_fkey";

-- DropForeignKey
ALTER TABLE "GroupCandidate" DROP CONSTRAINT "GroupCandidate_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "GroupCandidate" DROP CONSTRAINT "GroupCandidate_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Inscription" DROP CONSTRAINT "Inscription_groupId_fkey";

-- DropIndex
DROP INDEX "Group_formationId_idx";

-- DropIndex
DROP INDEX "Group_professorId_idx";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "effectif",
DROP COLUMN "formationId",
DROP COLUMN "professorId",
DROP COLUMN "type",
ADD COLUMN     "inscriptionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Inscription" DROP COLUMN "groupId",
ADD COLUMN     "professorId" TEXT;

-- DropTable
DROP TABLE "GroupCandidate";

-- CreateTable
CREATE TABLE "InscriptionCandidate" (
    "id" TEXT NOT NULL,
    "inscriptionId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InscriptionCandidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "reservationCode" TEXT NOT NULL,
    "reservationDate" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING',
    "inscriptionId" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InscriptionCandidate_inscriptionId_idx" ON "InscriptionCandidate"("inscriptionId");

-- CreateIndex
CREATE INDEX "InscriptionCandidate_candidateId_idx" ON "InscriptionCandidate"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "InscriptionCandidate_inscriptionId_candidateId_key" ON "InscriptionCandidate"("inscriptionId", "candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_reservationCode_key" ON "Reservation"("reservationCode");

-- CreateIndex
CREATE INDEX "Reservation_reservationDate_idx" ON "Reservation"("reservationDate");

-- CreateIndex
CREATE INDEX "Reservation_professorId_idx" ON "Reservation"("professorId");

-- CreateIndex
CREATE INDEX "Reservation_roomId_idx" ON "Reservation"("roomId");

-- CreateIndex
CREATE INDEX "Reservation_inscriptionId_idx" ON "Reservation"("inscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_inscriptionId_reservationDate_startTime_key" ON "Reservation"("inscriptionId", "reservationDate", "startTime");

-- CreateIndex
CREATE UNIQUE INDEX "Group_inscriptionId_key" ON "Group"("inscriptionId");

-- CreateIndex
CREATE INDEX "Inscription_professorId_idx" ON "Inscription"("professorId");

-- AddForeignKey
ALTER TABLE "Inscription" ADD CONSTRAINT "Inscription_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_inscriptionId_fkey" FOREIGN KEY ("inscriptionId") REFERENCES "Inscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscriptionCandidate" ADD CONSTRAINT "InscriptionCandidate_inscriptionId_fkey" FOREIGN KEY ("inscriptionId") REFERENCES "Inscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InscriptionCandidate" ADD CONSTRAINT "InscriptionCandidate_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_inscriptionId_fkey" FOREIGN KEY ("inscriptionId") REFERENCES "Inscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
