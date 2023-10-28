import { Input } from "@/components/ui/input";
import { extractProductFromDto, getDummyProduct } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import ProductCard from "../ProductCard";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { GetProductWithUserDto } from "@/types";
import { EmptyDataPlaceholder } from "../empty-data-placeholder";

interface MerchandiseSectionProps {
    className?: string,
    productWithUserDto: GetProductWithUserDto[]
}

export default function MerchandiseSection({ className = "", productWithUserDto }: MerchandiseSectionProps) {
    return (
        <>
        <div className={`flex gap-2 mb-5 mr-5 ${className}`}>
            <Input placeholder="Cari..." />
            <Button className="gap-2">
                <MagnifyingGlassIcon />
                Cari
            </Button>
        </div>
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Merchandise
                </h2>
                <p className="text-sm text-muted-foreground">
                    Temukan merchendise unik khas pampang.
                </p>
            </div>
        </div>
        <Separator className="my-4" />
        { productWithUserDto.length == 0 && (<EmptyDataPlaceholder title="Oops," subtitile="Belum ada produk merchendise saat ini" />) }
        <div className="h-auto w-full flex flex-wrap gap-6 justify-center">
        { productWithUserDto.map(dto => (
            <ProductCard product={extractProductFromDto(dto)} key={dto.pid}/>
        )) }
        </div>
        </>
    )
}