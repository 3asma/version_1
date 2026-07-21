-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterEnum
ALTER TYPE "CandidateStatus" ADD VALUE 'PENDING';

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

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "contact",
DROP COLUMN "formationId",
DROP COLUMN "giftCode",
ADD COLUMN     "firstContactId" TEXT,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "membershipNumber" TEXT,
ADD COLUMN     "registrationDate" TIMESTAMP(3),
ADD COLUMN     "secondContactId" TEXT,
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Formation" DROP COLUMN "description",
DROP COLUMN "duration",
DROP COLUMN "prix",
DROP COLUMN "totalSessions",
DROP COLUMN "type",
DROP COLUMN "volumeHoraire";

-- AlterTable
ALTER TABLE "Inscription" DROP COLUMN "groupId";

-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "specialite";

-- AlterTable
ALTER TABLE "Prospect" DROP COLUMN "contact",
DROP COLUMN "subject",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "firstContactId" TEXT,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "membershipNumber" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "registrationDate" TIMESTAMP(3),
ADD COLUMN     "secondContactId" TEXT;

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "GroupCandidate";

-- DropEnum
DROP TYPE "GroupType";

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_membershipNumber_key" ON "Candidate"("membershipNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Prospect_membershipNumber_key" ON "Prospect"("membershipNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Prospect_email_key" ON "Prospect"("email");

-- AddForeignKey
ALTER TABLE "Prospect" ADD CONSTRAINT "Prospect_firstContactId_fkey" FOREIGN KEY ("firstContactId") REFERENCES "Commercial"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prospect" ADD CONSTRAINT "Prospect_secondContactId_fkey" FOREIGN KEY ("secondContactId") REFERENCES "Commercial"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_firstContactId_fkey" FOREIGN KEY ("firstContactId") REFERENCES "Commercial"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_secondContactId_fkey" FOREIGN KEY ("secondContactId") REFERENCES "Commercial"("id") ON DELETE SET NULL ON UPDATE CASCADE;

