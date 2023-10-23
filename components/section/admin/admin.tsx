import { Separator } from "@/components/ui/separator"
import { AddProductForm } from "./add-form"
import { cn } from "@/lib/utils"

interface AddProductProps {
    className?: string,
    operation: string
}

export const AddProduct = ({ className = "", operation }: AddProductProps) => {
    return (
        <div className={cn("space-y-6", className)}>
        <div>
            <h3 className="text-lg font-medium">
                {operation == "add" && (<>Tambahkan Produk/Jasa</>)}
                {operation == "delete" && (<>Hapus Produk/Jasa</>)}
                {operation == "edit" && (<>Edit Produk/Jasa</>)}
            </h3>
            <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
            </p>
        </div>
        <Separator />
        <AddProductForm />
        </div>
    )
}