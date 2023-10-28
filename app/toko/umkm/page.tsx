import UMKMSection from "@/components/section/umkm";
import TokoPage from "../page";

export default async function TokoUMKMPage() {

    let dto = []

    try {
        const response = await fetch(`${process.env.BASE_URL}/api/product?type=umkm`, { cache: 'no-cache' })
        const result = await response.json()
        if (result.error) throw new Error(result.errorMessage)
        dto = result.data
    } catch (error) {
        console.error(error)
    }

    return (
        <TokoPage section="UMKM">
            <UMKMSection productWithUserDto={dto} className="mt-32" />
        </TokoPage>
    )
}