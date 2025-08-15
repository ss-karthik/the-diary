/*
  Warnings:

  - You are about to drop the column `frequency` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `recurring` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `section` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "frequency",
DROP COLUMN "recurring",
DROP COLUMN "section";
