-- CreateEnum
CREATE TYPE "UoM" AS ENUM ('UN', 'MT', 'CM', 'MM');

-- CreateTable
CREATE TABLE "material" (
    "id" TEXT NOT NULL,
    "uom" "UoM" NOT NULL DEFAULT 'UN',
    "quantity" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "stockId" TEXT,

    CONSTRAINT "material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "material" ADD CONSTRAINT "material_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE SET NULL ON UPDATE CASCADE;
