import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { debug } from "@/lib/utils"
import { ExitIcon, GearIcon, PersonIcon } from "@radix-ui/react-icons"
import { getServerSession } from "next-auth"
import Link from "next/link"
import LogoutButton from "./logout-button"
  
export async function UserNav() {

    const session = await getServerSession(authOptions)

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={session?.user.profilePicture || "/default_user_icon.png"} alt="@shadcn" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{session?.user.username}</p>
              <p className="text-xs leading-none text-muted-foreground">
                Administrator
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
                <Link href={'/profile/main'} className="flex gap-2 items-center">
                    <PersonIcon />
                    Profile
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Link href={'/profile/settings'} className="flex gap-2 items-center">
                    <GearIcon />
                    Pengaturan 
                </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive gap-2">
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }