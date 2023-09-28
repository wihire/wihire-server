/*
  Warnings:

  - The values [HYBIRD] on the enum `PlaceMethoded` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlaceMethoded_new" AS ENUM ('ONSITE', 'HYBRID', 'REMOTE');
ALTER TABLE "Job" ALTER COLUMN "placeMethod" TYPE "PlaceMethoded_new" USING ("placeMethod"::text::"PlaceMethoded_new");
ALTER TYPE "PlaceMethoded" RENAME TO "PlaceMethoded_old";
ALTER TYPE "PlaceMethoded_new" RENAME TO "PlaceMethoded";
DROP TYPE "PlaceMethoded_old";
COMMIT;
