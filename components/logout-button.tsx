'use client'

import { ExitIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <Button className="gap-2 pl-0" onClick={() => signOut()} variant={"ghost"}>
            <ExitIcon className="text-destructive"/>
            <span className="text-destructive">Log out</span>
        </Button>
    )
} 