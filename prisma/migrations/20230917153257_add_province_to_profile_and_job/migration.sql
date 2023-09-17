/*
  Warnings:

  - You are about to alter the column `address` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Added the required column `province` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "province" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "province" VARCHAR(255) NOT NULL,
ALTER COLUMN "address" SET DATA TYPE VARCHAR(255);
