/*
  Warnings:

  - You are about to alter the column `type` on the `customer` table. The data in that column could be lost. The data in that column will be cast from `Enum("customer_type")` to `Enum("Customer_type")`.

*/
-- DropIndex
DROP INDEX `Customer.email_unique` ON `customer`;

-- AlterTable
ALTER TABLE `customer` ADD COLUMN `advance` VARCHAR(191) NOT NULL DEFAULT '0',
    MODIFY `type` ENUM('CREDIT', 'WALKING') NOT NULL DEFAULT 'WALKING';

-- AlterTable
ALTER TABLE `sale` ADD COLUMN `salestatus` ENUM('PAID', 'UNPAID') NOT NULL DEFAULT 'UNPAID';
