/*
  Warnings:

  - Added the required column `name` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiver` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Account" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "sender" INTEGER NOT NULL,
    "receiver" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL
);
INSERT INTO "new_Transaction" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
