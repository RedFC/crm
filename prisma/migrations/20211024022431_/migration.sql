-- CreateTable
CREATE TABLE `CollectionRecord` (
    `id` VARCHAR(191) NOT NULL,
    `customerid` VARCHAR(191) NOT NULL,
    `saleid` VARCHAR(191) NOT NULL,
    `amount` VARCHAR(191) NOT NULL,
    `paidamount` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CollectionRecord` ADD FOREIGN KEY (`customerid`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CollectionRecord` ADD FOREIGN KEY (`saleid`) REFERENCES `Sale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
