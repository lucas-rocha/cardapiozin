-- CreateTable
CREATE TABLE "Customer_Restaurant" (
    "customer_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,

    CONSTRAINT "Customer_Restaurant_pkey" PRIMARY KEY ("customer_id","restaurant_id")
);

-- AddForeignKey
ALTER TABLE "Customer_Restaurant" ADD CONSTRAINT "Customer_Restaurant_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer_Restaurant" ADD CONSTRAINT "Customer_Restaurant_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
