-- DropForeignKey
ALTER TABLE "ApplicationList" DROP CONSTRAINT "ApplicationList_jobId_fkey";

-- DropForeignKey
ALTER TABLE "ApplicationList" DROP CONSTRAINT "ApplicationList_userId_fkey";

-- AddForeignKey
ALTER TABLE "ApplicationList" ADD CONSTRAINT "ApplicationList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationList" ADD CONSTRAINT "ApplicationList_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
