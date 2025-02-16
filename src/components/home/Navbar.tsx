import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import LoginModal from "../auth/Login";

export default function Navbar({ user }: { user?: CustomUser }) {
  return (
    <nav className="bg-black shadow-sm">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          {/* <Image src="/logo.png" width={40} height={40} alt="lgo" /> */}
          <h1 className="text-3xl font-extrabold ">VideoIQ</h1>
        </div>

        <div className="space-x-4">
          <Button variant="secondary">Pricing</Button>
          {user ? (
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          ) : (
            <LoginModal/>
          )}
        </div>
      </div>
    </nav>
  );
}