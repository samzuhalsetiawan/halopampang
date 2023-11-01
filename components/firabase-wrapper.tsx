'use client'

import { ReactNode, useEffect } from "react"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "@/constants";
import { getStorage } from "firebase/storage";

interface FirebaseProviderProps {
    children: ReactNode
}

export default function FirebaseProvider({children}: FirebaseProviderProps) {
    
    useEffect(() => {
        console.log("Trigerred")
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const storage = getStorage(app);
        (window as any).fbStorage = storage
    }, [])
    
    return (
        <>
            {children}
        </>
    )
}