-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "restaurant_id" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu_Item_Category" (
    "menu_item_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "Menu_Item_Category_pkey" PRIMARY KEY ("menu_item_id","category_id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu_Item_Category" ADD CONSTRAINT "Menu_Item_Category_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "Menu_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu_Item_Category" ADD CONSTRAINT "Menu_Item_Category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
