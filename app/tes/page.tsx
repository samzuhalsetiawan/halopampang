import FadeCarousel from "@/components/carousel/FadeCarousel";
import NormalCarousel from "@/components/carousel/NormalCarousel";
import Image from "next/image";

export default function TesPage() {
    const slides = [
        "/1.jpg",
        "/2.jpg",
        "/3.jpg",
        "/4.jpg",
        "/5.jpg",
    ]
    return (
        <main>
            <div className="max-w-lg">
                <NormalCarousel>
                    {slides.map(el => (<img src={el} />))}
                </NormalCarousel>
            </div>
        </main>
    )
}