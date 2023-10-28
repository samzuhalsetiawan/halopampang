import MerchandiseSection from "@/components/section/merchandise";
import TokoPage from "../page";

export default async function TokoMerchandisePage() {

    let dto = []

    try {
        const response = await fetch(`${process.env.BASE_URL}/api/product?type=merchandise`, { cache: 'no-cache' })
        const result = await response.json()
        if (result.error) throw new Error(result.errorMessage)
        dto = result.data
    } catch (error) {
        console.error(error)
    }

    return (
        <TokoPage section="MERCHANDISE">
            <MerchandiseSection productWithUserDto={dto} className="mt-32" />
        </TokoPage>
    )
}