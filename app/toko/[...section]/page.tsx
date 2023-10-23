import Image from "next/image"

import { ScrollArea } from "@/components/ui/scroll-area"

import { Sidebar } from "@/components/sidebar"
import JasaSection from "@/components/section/jasa"
import MerchandiseSection from "@/components/section/merchandise"
import UMKMSection from "@/components/section/umkm"
import { AddProduct } from "@/components/section/admin/admin"

interface MusicPageProps {
  params: { section: string[] },
  searchParams: any
}

export default function MusicPage({ params, searchParams }: MusicPageProps) {

  console.log(params)
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
              <Sidebar param={params.section.join("/")} className="hidden lg:block mt-32" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                    <ScrollArea className="h-screen w-full">
                        {params.section[0] == "jasa" && (
                          <JasaSection className="mt-32" />
                        )}
                        {params.section[0] == "merchandise" && (
                          <MerchandiseSection className="mt-32" />
                        )}
                        {params.section[0] == "umkm" && (
                          <UMKMSection className="mt-32" />
                        )}
                        {params.section[0] == "admin" && params.section[1] == "add" && (
                          <AddProduct operation={params.section[1]} className="mt-32" />
                        )}
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