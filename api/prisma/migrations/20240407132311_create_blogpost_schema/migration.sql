-- CreateTable
CREATE TABLE "Blog_post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "lead" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "restaurant_id" INTEGER,

    CONSTRAINT "Blog_post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Blog_post" ADD CONSTRAINT "Blog_post_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "Restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
