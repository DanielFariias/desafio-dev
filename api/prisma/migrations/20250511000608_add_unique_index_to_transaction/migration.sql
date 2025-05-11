/*
  Warnings:

  - A unique constraint covering the columns `[storeId,transactionAt,card,cpf,type]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Transaction_storeId_transactionAt_card_cpf_type_key" ON "Transaction"("storeId", "transactionAt", "card", "cpf", "type");
