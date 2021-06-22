/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account.name_unique" ON "Account"("name");
