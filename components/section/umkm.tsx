import { Input } from "@/components/ui/input";
import { getDummyProduct } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import ProductCard from "../ProductCard";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface UMKMSectionProps {
    className?: string
}

export default function UMKMSection({ className = "" }: UMKMSectionProps) {
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
                    UMKM
                </h2>
                <p className="text-sm text-muted-foreground">
                    Temukan produk UMKM terbaik dari pampang.
                </p>
            </div>
        </div>
        <Separator className="my-4" />
        <div className="h-auto w-full flex flex-wrap gap-6 justify-center">
            <ProductCard product={getDummyProduct()}/>
            <ProductCard product={getDummyProduct()}/>
            <ProductCard product={getDummyProduct()}/>
            <ProductCard product={getDummyProduct()}/>
            <ProductCard product={getDummyProduct()}/>
            <ProductCard product={getDummyProduct()}/>
            <ProductCard product={getDummyProduct()}/>
            <ProductCard product={getDummyProduct()}/>
        </div>
        </>
    )
}