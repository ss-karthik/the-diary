/*
  Warnings:

  - The `tags` column on the `Habit` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];

-- AlterTable
ALTER TABLE "HabitLog" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP;
