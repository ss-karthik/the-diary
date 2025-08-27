/*
  Warnings:

  - You are about to drop the `HabitLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HabitLog" DROP CONSTRAINT "HabitLog_habitId_fkey";

-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "logs" BOOLEAN[];

-- DropTable
DROP TABLE "HabitLog";
