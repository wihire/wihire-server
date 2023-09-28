/*
  Warnings:

  - You are about to drop the column `categoriesId` on the `JobCategory` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `JobCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JobCategory" DROP CONSTRAINT "JobCategory_categoriesId_fkey";

-- AlterTable
ALTER TABLE "JobCategory" DROP COLUMN "categoriesId",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "JobCategory" ADD CONSTRAINT "JobCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
