-- CreateTable
CREATE TABLE "summary" (
    "id" UUID NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "response" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "summary_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "summary" ADD CONSTRAINT "summary_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
