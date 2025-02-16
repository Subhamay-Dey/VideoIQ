import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from "react";
import UserAvatar from "./UserAvatar";

function ProfileDropdownMenu({user}:{user:CustomUser}) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar image={user?.image ?? undefined} name={user?.name!}/>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Transactions</DropdownMenuItem>
        <DropdownMenuItem>Coins Spend</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdownMenu;
