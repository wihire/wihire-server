/*
  Warnings:

  - You are about to drop the column `EndDate` on the `UserEducation` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `UserEducation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserEducation" DROP COLUMN "EndDate",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL;
