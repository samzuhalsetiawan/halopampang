import { Product } from "@/types";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Card className="h-[28rem] w-64 overflow-hidden group cursor-pointer">
            <CardContent className="p-0">
                <div className="h-64 w-full relative overflow-hidden">
                    <Image className="group-hover:scale-110 transition duration-700" objectFit="cover" src={product.imageUrls[0]} alt={`foto produk ${product.name}`} fill />
                </div>
            </CardContent>
            <CardFooter>
                <div className="flex flex-col h-44 w-full justify-between pt-3 gap-1">
                    <div>
                        <p className="text-amber-500">Rp.{product.price}</p>
                        <p className="text-lg mt-1">{product.name}</p>
                        <p className="text-muted-foreground">{product.owner.name}</p>
                    </div>
                    <Button>Chat penjual</Button>
                </div>
            </CardFooter>
        </Card>
    )
}