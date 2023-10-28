import Image from "next/image"

import { ScrollArea } from "@/components/ui/scroll-area"

import { Sidebar } from "@/components/sidebar"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { TokoSection } from "@/types"

interface TokoPageProps {
  children: React.ReactNode,
  section?: TokoSection
}

export default async function TokoPage({ children, section = "UMKM" }: TokoPageProps) {

  const session = await getServerSession(authOptions)

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Music"
          className="block dark:hidden"
        />
        <Image
          src="/examples/music-dark.png"
          width={1280}
          height={1114}
          alt="Music"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden md:block">
        <div>
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar user={session?.user} section={section} className="hidden lg:block mt-32" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                    <ScrollArea className="h-screen w-full">
                        {children}
                    </ScrollArea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}