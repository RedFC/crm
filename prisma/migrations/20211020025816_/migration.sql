/*
  Warnings:

  - You are about to drop the column `saleId` on the `ledger` table. All the data in the column will be lost.
  - Added the required column `customerid` to the `ledger` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ledger` DROP FOREIGN KEY `ledger_ibfk_1`;

-- AlterTable
ALTER TABLE `ledger` DROP COLUMN `saleId`,
    ADD COLUMN `customerid` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ledger` ADD FOREIGN KEY (`customerid`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
