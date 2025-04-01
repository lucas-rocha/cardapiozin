-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "total_amount" DECIMAL(65,30) NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "restaurant_id" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_item" (
    "id" SERIAL NOT NULL,
    "menu_item_id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,

    CONSTRAINT "Order_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_item" ADD CONSTRAINT "Order_item_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "Menu_item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_item" ADD CONSTRAINT "Order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
