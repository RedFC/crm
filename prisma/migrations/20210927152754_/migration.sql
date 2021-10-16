/*
  Warnings:

  - You are about to drop the column `teamadmin` on the `teams` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `teams` DROP FOREIGN KEY `teams_ibfk_1`;

-- AlterTable
ALTER TABLE `teams` DROP COLUMN `teamadmin`;

-- CreateTable
CREATE TABLE `TeamAdmin` (
    `userId` VARCHAR(191) NOT NULL,
    `teamId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TeamAdmin_teamId_unique`(`teamId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TeamAdmin` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamAdmin` ADD FOREIGN KEY (`teamId`) REFERENCES `Teams`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
