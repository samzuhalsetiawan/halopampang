"use client"

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"


export default function NavbarWrapper() {
    
    const pathName = usePathname()

    const unHeader = ["/login", "/register", "/tes"]

    if (unHeader.includes(pathName)) {
        return <></>
    } else {
        return <Navbar className='fixed z-50' />
    }
}