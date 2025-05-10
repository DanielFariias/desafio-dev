-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('DEBIT', 'BANK_SLIP', 'FINANCING', 'CREDIT', 'LOAN_RECEIPT', 'SALE', 'TED_RECEIPT', 'DOC_RECEIPT', 'RENT');

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "transactionAt" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "cpf" CHAR(11) NOT NULL,
    "card" CHAR(12) NOT NULL,
    "storeId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
