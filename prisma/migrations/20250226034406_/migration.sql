/*
  Warnings:

  - You are about to drop the column `created_at` on the `credit_package` table. All the data in the column will be lost.
  - You are about to drop the column `credit_amount` on the `credit_package` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `credit_package` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `skill` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `skill` table. All the data in the column will be lost.
  - Added the required column `creditAmount` to the `credit_package` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "credit_package" DROP COLUMN "created_at",
DROP COLUMN "credit_amount",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "creditAmount" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "skill" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "role" VARCHAR(20) NOT NULL,
    "password" VARCHAR(72) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "experienceYears" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "profileImageUrl" VARCHAR(2048) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_link_skill" (
    "id" UUID NOT NULL,
    "coachId" UUID NOT NULL,
    "skillId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coach_link_skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_purchase" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "creditPackageId" UUID NOT NULL,

    CONSTRAINT "credit_purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_booking" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "courseId" UUID NOT NULL,
    "bookingAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(20) NOT NULL,
    "joinAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leaveAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cancelledAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cancellationReason" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "skillId" UUID NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" TEXT NOT NULL,
    "startAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "maxParticipants" INTEGER NOT NULL,
    "meetingUrl" VARCHAR(2048) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coachLinkSkillId" UUID,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "coach_userId_key" ON "coach"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "coach_link_skill_coachId_key" ON "coach_link_skill"("coachId");

-- CreateIndex
CREATE UNIQUE INDEX "coach_link_skill_skillId_key" ON "coach_link_skill"("skillId");

-- AddForeignKey
ALTER TABLE "coach" ADD CONSTRAINT "coach_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_link_skill" ADD CONSTRAINT "coach_link_skill_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "coach"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_link_skill" ADD CONSTRAINT "coach_link_skill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_purchase" ADD CONSTRAINT "credit_purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_purchase" ADD CONSTRAINT "credit_purchase_creditPackageId_fkey" FOREIGN KEY ("creditPackageId") REFERENCES "credit_package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_booking" ADD CONSTRAINT "course_booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_booking" ADD CONSTRAINT "course_booking_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_coachLinkSkillId_fkey" FOREIGN KEY ("coachLinkSkillId") REFERENCES "coach_link_skill"("id") ON DELETE SET NULL ON UPDATE CASCADE;
