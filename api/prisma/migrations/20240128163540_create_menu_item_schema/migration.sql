-- CreateTable
CREATE TABLE "Menu_item" (
    "id" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "restaurant_id" INTEGER,

    CONSTRAINT "Menu_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Menu_item_item_name_key" ON "Menu_item"("item_name");

-- AddForeignKey
ALTER TABLE "Menu_item" ADD CONSTRAINT "Menu_item_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
