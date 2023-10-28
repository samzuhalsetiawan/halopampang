import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { AddInformationForm } from "@/components/section/add-information";
import { Card } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AddInformationPage() {

    const session = await getServerSession(authOptions)
    if (!session?.user.uid || session.user.uid != process.env.ADMIN_USERID) redirect('/informasi')

    return (
        <div className="min-h-screen w-screen flex justify-center items-center pt-32">
            <Card className="p-8">
                <AddInformationForm userId={session.user.uid} />
            </Card>
        </div>
    )
}