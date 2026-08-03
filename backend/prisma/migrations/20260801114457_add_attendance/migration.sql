-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT');

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "status" "AttendanceStatus" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Attendance_reservationId_idx" ON "Attendance"("reservationId");

-- CreateIndex
CREATE INDEX "Attendance_candidateId_idx" ON "Attendance"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_reservationId_candidateId_key" ON "Attendance"("reservationId", "candidateId");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
