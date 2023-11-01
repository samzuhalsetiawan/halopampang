import { cn } from "@/lib/utils"
import React from "react"

interface ProfileSettingsSectionProps {
    className?: React.ReactNode
}

export default function ProfileSettingsSection({ className = "" }: ProfileSettingsSectionProps) {
    return (
        <div className={cn("h-screen w-auto", className)}>
            <h1>Settings</h1>
        </div>
    )
}