import UMKMSection from "@/components/section/umkm";
import TokoPage from "../page";
import ProfilePage from "../page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import ProfileMainSection from "@/components/section/profile/main";
import ProfileSettingsSection from "@/components/section/settings/settings";

export default async function ProfileSettingsPage() {

    const session = await getServerSession(authOptions)
    if (!session) redirect("/")

    //TODO: Do something with this one too
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
        <ProfilePage section="SETTINGS">
            <ProfileSettingsSection className="mt-32" />
        </ProfilePage>
    )
}