/*
  Warnings:

  - Added the required column `tenant_id` to the `material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenant_id` to the `stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "material" ADD COLUMN     "tenant_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "product" ADD COLUMN     "tenant_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "stock" ADD COLUMN     "tenant_id" TEXT NOT NULL;
