import { AdminTokoSection } from "@/components/section/admin/admin";
import TokoPage from "../../page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function TokoAdminPage() {

    const session = await getServerSession(authOptions)
    if (!session) redirect('/toko')

    return (
        <TokoPage section="ADMIN/ADD">
            <AdminTokoSection section="ADMIN/ADD" className="mt-32" />
        </TokoPage>
    )
}