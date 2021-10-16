/*
  Warnings:

  - Made the column `teamadmin` on table `teams` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `teams` DROP FOREIGN KEY `teams_ibfk_1`;

-- AlterTable
ALTER TABLE `teams` MODIFY `teamadmin` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Teams` ADD FOREIGN KEY (`teamadmin`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
