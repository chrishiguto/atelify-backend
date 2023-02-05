/*
  Warnings:

  - You are about to drop the column `productId` on the `material` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "material" DROP CONSTRAINT "material_productId_fkey";

-- AlterTable
ALTER TABLE "material" DROP COLUMN "productId";

-- CreateTable
CREATE TABLE "_MaterialToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MaterialToProduct_AB_unique" ON "_MaterialToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_MaterialToProduct_B_index" ON "_MaterialToProduct"("B");

-- AddForeignKey
ALTER TABLE "_MaterialToProduct" ADD CONSTRAINT "_MaterialToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "material"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaterialToProduct" ADD CONSTRAINT "_MaterialToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
