import { Product, ProductDto } from "@/types";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import NormalCarousel from "./carousel/NormalCarousel";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Dialog>
            <DialogTrigger>
                <Card className="h-[28rem] w-64 overflow-hidden group cursor-pointer">
                    <CardContent className="p-0">
                        <div className="h-64 w-full relative overflow-hidden">
                            <Image className="group-hover:scale-110 transition duration-700" style={{ 'objectFit': 'cover' }} src={product.imageUrls.at(0) || "/1.jpg"} alt={`foto produk ${product.name}`} fill />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="flex flex-col h-44 w-full justify-between pt-3 gap-1">
                            <div className="flex flex-col items-start text-left">
                                <p className="text-amber-500">Rp.{product.price}</p>
                                <p className="text-lg mt-1">{product.name}</p>
                                <p className="text-muted-foreground">{product.ownerName}</p>
                            </div>
                            <Button asChild>
                                <Link target="_blank" href={`https://web.whatsapp.com/send?phone=62${product.phoneNumber.substring(1)}&text=Halo%2C+Apakah+produk+berikut+masih+tersedia%3F%0D%0ANama+produk%3A+${product.name}%0D%0AHarga+Produk%3A+Rp.${product.price}`}>Chat penjual</Link>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <h3 className='font-bold'>{product.name}</h3>
                <ScrollArea className="h-[68vh]">
                <div>
                    <NormalCarousel>
                        {product.imageUrls.map((url, i) => (<img className="h-full w-full object-cover object-center" src={url} key={i} />))}
                    </NormalCarousel>
                    <div className="py-3">
                        <p className="text-amber-500">Rp.{product.price}</p>
                        <p className="text-lg mt-1">{product.name}</p>
                        <p className="text-muted-foreground">{product.ownerName}</p>
                    </div>
                    <Separator />
                    <p className='mt-4'>{product.description}</p>
                    <div className="mt-5 flex justify-center items-stretch">
                        <Button asChild className="flex-1">
                            <Link target="_blank" href={`https://web.whatsapp.com/send?phone=62${product.phoneNumber.substring(1)}&text=Halo%2C+Apakah+produk+berikut+masih+tersedia%3F%0D%0ANama+produk%3A+${product.name}%0D%0AHarga+Produk%3A+Rp.${product.price}`}>Chat penjual</Link>
                        </Button>
                    </div>
                </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}