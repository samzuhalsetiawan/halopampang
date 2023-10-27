'use client'

import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

interface NavbarProps {
    className?: string
}

export default function Navbar({ className }: NavbarProps = { className: "" }) {

    const { data: session } = useSession()
    const pathName = usePathname()
    const unHeader = ["/login", "/register", "/tes"]

    if (unHeader.includes(pathName)) return <></>

    return (
        <div className={`h-28 w-screen px-16 flex justify-between items-center shadow backdrop-blur ${className}`}>
            <div className="h-full cursor-pointer aspect-square relative">
                <Image src={'/logo.png'} alt="logo halopampang" fill />
            </div>
            <div className="flex h-full justify-end items-center gap-8">
                <ul className="flex gap-6">
                    <li className={`${pathName == "/" ? "text-sky-500 border-b-sky-500" : "border-b-transparent"} hover:text-sky-500 py-3 cursor-pointer transition border-b hover:border-b hover:border-b-sky-500`} key={'beranda'}>
                        <Link href={'/'}>Beranda</Link>
                    </li>
                    <li className={`${pathName == "/informasi" ? "text-sky-500 border-b-sky-500": "border-b-transparent"} hover:text-sky-500 py-3 cursor-pointer transition border-b  hover:border-b hover:border-b-sky-500`} key={'informasi'}>
                        <Link href={'/informasi'}>Informasi</Link>
                    </li>
                    <li className={`${pathName.substring(0, 5) == "/toko" ? "text-sky-500 border-b-sky-500" : "border-b-transparent"} hover:text-sky-500 py-3 cursor-pointer transition border-b hover:border-b hover:border-b-sky-500`} key={'toko'}>
                        <Link href={'/toko'}>Toko</Link>
                    </li>
                    <li className={`${pathName == "/tentang" ? "text-sky-500 border-b-sky-500": "border-b-transparent"} hover:text-sky-500 py-3 cursor-pointer transition border-b hover:border-b hover:border-b-sky-500`} key={'tentang'}>
                        <Link href={'/tentang'}>Tentang</Link>
                    </li>
                    { session?.user ? (
                        <li className="hover:text-sky-500 py-3 cursor-pointer transition border-b border-b-transparent hover:border-b hover:border-b-sky-500" key={'logout'}>
                            <button onClick={() => signOut()}>Logout</button>
                        </li>
                    ) : (
                        <li className="hover:text-sky-500 py-3 cursor-pointer transition border-b border-b-transparent hover:border-b hover:border-b-sky-500" key={'login'}>
                            <Link href={'/login'}>Login</Link>
                        </li>
                    ) }
                </ul>
                { session?.user && (
                    <div className="h-2/5 cursor-pointer aspect-square relative rounded-full overflow-hidden">
                        <Image src={'/default_user_icon.png'} alt="logo halopampang" fill />
                    </div>
                ) }
            </div>
        </div>
    )
}