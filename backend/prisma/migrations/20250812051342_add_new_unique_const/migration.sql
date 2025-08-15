/*
  Warnings:

  - A unique constraint covering the columns `[habitId,dateCreated]` on the table `HabitLog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HabitLog_habitId_dateCreated_key" ON "HabitLog"("habitId", "dateCreated");
