import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { GetInformationsDto } from "@/types";
import InformationCard from "@/components/InformationCard";
import { EmptyDataPlaceholder } from "@/components/empty-data-placeholder";
import { debug } from "@/lib/utils";

export default async function InformasiPage() {

    const session = await getServerSession(authOptions)

    const response = await fetch(`${process.env.BASE_URL}/api/information`)
    const  informations: { data: GetInformationsDto[] } = await response.json()

    return (
        <div className={`h-screen w-screen flex flex-col gap-5 items-center ${informations.data.length > 0 ? "pt-36 justify-start" : "justify-center"}`}>
            { informations.data.length == 0 && <EmptyDataPlaceholder title={"Oops,"} subtitile="Sepertinya belum ada informasi terbaru" />}
            { session && session.user.uid === process.env.ADMIN_USERID && (
                <Button asChild>
                    <Link href={'/informasi/add'}>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Informasi Baru
                    </Link>
                </Button>
            ) }
            { informations.data.map(information => ( <InformationCard information={information} key={information.id} /> )) }
        </div>
    )
}