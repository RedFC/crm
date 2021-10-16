/*
  Warnings:

  - A unique constraint covering the columns `[teamadmin]` on the table `Teams` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `teams` ADD COLUMN `teamadmin` VARCHAR(191) DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX `Teams_teamadmin_unique` ON `Teams`(`teamadmin`);

-- AddForeignKey
ALTER TABLE `Teams` ADD FOREIGN KEY (`teamadmin`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
