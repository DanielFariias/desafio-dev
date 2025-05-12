/*
  Warnings:

  - A unique constraint covering the columns `[storeId,transactionAt,card,cpf,type,value]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Transaction_storeId_transactionAt_card_cpf_type_key";

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_storeId_transactionAt_card_cpf_type_value_key" ON "Transaction"("storeId", "transactionAt", "card", "cpf", "type", "value");
