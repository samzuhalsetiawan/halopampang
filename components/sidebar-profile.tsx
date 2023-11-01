import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ProfileSection } from "@/types"
import { GearIcon, PersonIcon } from "@radix-ui/react-icons"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    section: ProfileSection
}

export function SidebarProfile({ className, section }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Menu
          </h2>
          <div className="space-y-1">
            <Button asChild variant={section == "PROFILE" ? "secondary" : "ghost"} className="w-full justify-start">
                <Link href={'/profile/main'}>
                    <PersonIcon className="mr-2 h-4 w-4" />
                    Profil
                </Link>
            </Button>
            <Button asChild variant={section == "SETTINGS" ? "secondary" : "ghost"} className="w-full justify-start">
              <Link href={'/profile/settings'}>
                <GearIcon className="mr-2 h-4 w-4" />
                Pengaturan
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}