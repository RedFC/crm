/*
  Warnings:

  - You are about to drop the `teamadmin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `teamadmin` DROP FOREIGN KEY `teamadmin_ibfk_2`;

-- DropForeignKey
ALTER TABLE `teamadmin` DROP FOREIGN KEY `teamadmin_ibfk_1`;

-- DropTable
DROP TABLE `teamadmin`;
