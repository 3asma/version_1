-- CreateEnum
CREATE TYPE "Occupation" AS ENUM ('STUDENT', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "Observation" AS ENUM ('ALONE', 'ACCOMPANIED');

-- CreateTable
CREATE TABLE "Prospect" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "occupation" "Occupation" NOT NULL,
    "subject" TEXT NOT NULL,
    "giftCode" TEXT,
    "observation" "Observation" NOT NULL,
    "contact" TEXT[],
    "action" TEXT,
    "status" TEXT NOT NULL DEFAULT 'prospect',
    "freeSessionsCompleted" INTEGER NOT NULL DEFAULT 0,
    "absences" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prospect_pkey" PRIMARY KEY ("id")
);
