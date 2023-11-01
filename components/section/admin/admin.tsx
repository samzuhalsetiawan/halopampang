import { Separator } from "@/components/ui/separator"
import { AddProductForm } from "./add-form"
import { cn } from "@/lib/utils"
import { TokoSection } from "@/types"

interface AdminTokoSectionProps {
    className?: string,
    section: TokoSection
}

export const AdminTokoSection = async ({ className = "", section }: AdminTokoSectionProps) => {
    return (
        <div className={cn("space-y-6", className)}>
        <div>
            <h3 className="text-lg font-medium">
                {section == "ADMIN/ADD" && (<>Tambahkan Produk/Jasa</>)}
                {section == "ADMIN/DELETE" && (<>Hapus Produk/Jasa</>)}
                {section == "ADMIN/EDIT" && (<>Edit Produk/Jasa</>)}
            </h3>
            {/* <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
            </p> */}
        </div>
        <Separator />
        <AddProductForm />
        </div>
    )
}