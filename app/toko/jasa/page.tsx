import JasaSection from "@/components/section/jasa";
import TokoPage from "../page";
import { EmptyDataPlaceholder } from "@/components/empty-data-placeholder";

export default function TokoJasaPage() {
    return (
        <TokoPage section="JASA">
            <div className="h-screen w-full flex justify-center items-center">
                <EmptyDataPlaceholder title="Comming Soon" subtitile="Mohon maaf, Fitur ini masih dalam tahap pengembangan" />
            </div>
            {/* <JasaSection className="mt-32" /> */}
        </TokoPage>
    )
}