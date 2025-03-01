import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { Suspense, useState } from "react";
import UserAvatar from "./UserAvatar";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
const Logout = dynamic(() => import("../auth/Logout"))

function ProfileDropdownMenu({user}:{user:CustomUser}) {

  const [open, setOpen] = useState(false)

  const router = useRouter();

  return (
    <>
    {open && 
      <Suspense fallback={<p>Loading...</p>}>
        <Logout open={open} setOpen={setOpen}/>
      </Suspense>
    }
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar image={user?.image ?? undefined} name={user?.name!}/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Transactions</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/coins-spend")}>Coins Spend</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpen(true)}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
}

export default ProfileDropdownMenu;
