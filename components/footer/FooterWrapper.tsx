"use client"

import { usePathname } from "next/navigation"
import Footer from "./Footer"


export default function FooterWrapper() {

    const pathName = usePathname()

    const unFooter = ["/login", "/register", "/tes"]

    if (unFooter.includes(pathName)) {
        return <></>
    } else {
        return <Footer />
    }
}