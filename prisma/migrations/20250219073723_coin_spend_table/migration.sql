-- CreateTable
CREATE TABLE "coin_spend" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "summary_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coin_spend_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "coin_spend" ADD CONSTRAINT "coin_spend_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coin_spend" ADD CONSTRAINT "coin_spend_summary_id_fkey" FOREIGN KEY ("summary_id") REFERENCES "summary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
