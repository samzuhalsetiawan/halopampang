import { ImageCarousel, ImageCard } from '@/components/carousel/Carousel'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
    <main className='min-h-screen w-screen flex justify-center items-center'>
      <section className='flex justify-between items-center w-screen h-screen'>
        <div className='h-full flex flex-col justify-center items-start flex-1 gap-12 pl-16'>
          <h1 className='text-6xl'>Selamat Datang di Halopampang!</h1>
          <Button>Temukan Produk</Button>
        </div>
        <div className='h-full flex flex-col justify-center items-center flex-1 relative'>
          <div className='translate-x-28 h-2/3 aspect-video relative'>
            <Image src={'/hero-bg.png'} alt='Hero Background' fill />
          </div>
          <div className='absolute'>
            <ImageCarousel className='h-48'>
                {[...new Array(20)].map((_, i) => (
                <ImageCard url={`/${i + 1}.jpg`} />
                ))}
            </ImageCarousel>
          </div>
        </div>
      </section>
    </main>
  )
}
