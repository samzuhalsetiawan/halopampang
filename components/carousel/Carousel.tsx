'use client'

import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import React, { useEffect, useRef, useState } from 'react';
import style from './Carousel.module.css'
import Image from 'next/image';

const MAX_VISIBILITY = 3;

interface CarouselCardProps {
    url: string,
}

interface ImageCarouselProps {
    children: React.ReactNode,
    className?: string
}

function Card({url}: CarouselCardProps) {
    return (
        <div className={style.card}>
            {/* <h2 className={style.cardh2}>{title}</h2>
            <p className={style.cardp}>{content}</p> */}
            {/* <img className={style.foto} src="/1.jpg" alt="tes" /> */}
            <div className='h-full w-full relative'>
              <Image src={url} alt='tes' fill style={{ 'objectFit': 'cover' }}/>
            </div>
        </div>
    )
}

function Carousel({children, className = ""}: ImageCarouselProps) {
  const [active, setActive] = useState(2);
  const [isReverse, setIsReverse] = useState(false)
  const count = React.Children.count(children);
  const buttonPrevRef = useRef<HTMLButtonElement>(null)
  const buttonNextRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (active == count - 2) setIsReverse(true)
    if (active == 1) setIsReverse(false)
    const interval = setInterval(() => {
      if (isReverse) {
        buttonPrevRef.current?.click()
      } else if (!isReverse) {
        buttonNextRef.current?.click()
      }
    }, 2000)
    return () => {
      clearInterval(interval)
    }
  }, [active]);
  
  return (
    <div className={`${style.carousel} ${className}`}>
      {active > 0 && <button ref={buttonPrevRef} className={style.navleft} onClick={() => setActive(i => i - 1)}><DoubleArrowLeftIcon/></button>}
      {React.Children.map(children, (child, i) => (
        <div className={style.cardcontainer} style={{
            '--active': i === active ? 1 : 0,
            '--offset': (active - i) / 3,
            '--direction': Math.sign(active - i),
            '--abs-offset': Math.abs(active - i) / 3,
            'pointerEvents': active === i ? 'auto' : 'none',
            'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
            'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
          } as any}>
          {child}
        </div>
      ))}
      {active < count - 1 && <button ref={buttonNextRef} className={style.navright} onClick={() => setActive(i => i + 1)}><DoubleArrowRightIcon/></button>}
    </div>
  );
};

// export const ImageCarousel = Carousel as typeof Carousel & {
//   Image: typeof Card
// }

// ImageCarousel.Image = Card

export const ImageCarousel = Carousel
export const ImageCard = Card