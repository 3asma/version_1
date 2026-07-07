/*
  Warnings:

  - The values [PENDING] on the enum `CandidateStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CandidateStatus_new" AS ENUM ('ACTIVE', 'INACTIVE');
ALTER TABLE "Candidate" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Candidate" ALTER COLUMN "status" TYPE "CandidateStatus_new" USING ("status"::text::"CandidateStatus_new");
ALTER TYPE "CandidateStatus" RENAME TO "CandidateStatus_old";
ALTER TYPE "CandidateStatus_new" RENAME TO "CandidateStatus";
DROP TYPE "CandidateStatus_old";
ALTER TABLE "Candidate" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "Candidate" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
