/*
  Warnings:

  - You are about to drop the column `available` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "available",
DROP COLUMN "description",
DROP COLUMN "type";
