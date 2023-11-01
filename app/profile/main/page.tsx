import UMKMSection from "@/components/section/umkm";
import TokoPage from "../page";
import ProfilePage from "../page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import ProfileMainSection from "@/components/section/profile/main";

export default async function ProfileMainPage() {

    const session = await getServerSession(authOptions)
    if (!session) redirect("/")

    // TODO: Do somethis with this
    // let dto = []

    // try {
    //     const response = await fetch(`${process.env.BASE_URL}/api/preferences?uid=${session.user.uid}`, { cache: 'no-cache' })
    //     const result = await response.json()
    //     if (result.error) throw new Error(result.errorMessage)
    //     dto = result.data
    // } catch (error) {
    //     console.error(error)
    // }

    return (
        <ProfilePage section="PROFILE">
            <ProfileMainSection user={session.user} className="mt-32" />
        </ProfilePage>
    )
}