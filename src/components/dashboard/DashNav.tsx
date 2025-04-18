"use client";
import React from "react";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import Image from "next/image";
import Link from "next/link";
import ProfileDropdownMenu from "../common/ProfileDropdownMenu";

async function DashNav({
  user,
  userCoins,
}: {
  user: CustomUser;
  userCoins: CoinsType | null;
}) {
  return (
    <nav className="w-full flex justify-between items-center h-16 p-2">
      <Link href="/">
        <div className="flex items-center space-x-2">
          {/* <Image src="" width={40} height={40} alt="lgo" /> */}
          <h1 className="text-2xl font-extrabold ">VideoIQ</h1>
        </div>
      </Link>
      <div className="flex items-center space-x-4">
        <div className="flex space-x-2 items-center">
          <span className="text-xl font-bold">{userCoins?.coins ?? 0}</span>
          <Image src="/images/coin.png" width={30} height={30} alt="coin" />
        </div>
        <ProfileDropdownMenu user={user} />
      </div>
    </nav>
  );
}

export default DashNav
