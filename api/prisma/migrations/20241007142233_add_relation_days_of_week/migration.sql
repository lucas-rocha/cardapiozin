-- CreateTable
CREATE TABLE "Restaurant_Hour" (
    "id" SERIAL NOT NULL,
    "open_time" TIMESTAMP(3),
    "close_time" TIMESTAMP(3),
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "is_24_hours" BOOLEAN NOT NULL DEFAULT false,
    "days_of_week_id" INTEGER NOT NULL,

    CONSTRAINT "Restaurant_Hour_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Restaurant_Hour" ADD CONSTRAINT "Restaurant_Hour_days_of_week_id_fkey" FOREIGN KEY ("days_of_week_id") REFERENCES "Days_Of_Week"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
