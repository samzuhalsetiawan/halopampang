import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import NavbarClient from "./NavbarClient";
import { UserNav } from "../user-profile-nav";

interface NavbarProps {
    className?: string
}

export default async function Navbar({ className }: NavbarProps = { className: "" }) {

    const session = await getServerSession(authOptions)

    return (
        <NavbarClient className={className}>
            { session ? (
                <UserNav />
            ): (<></>)}
        </NavbarClient>
    )
}