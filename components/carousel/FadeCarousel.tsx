import Image from 'next/image'
import styles from './FedeCarousel.module.css'

interface FaadeCarouselProps {
    className?: string,
}

export default function FadeCarousel({ className = "" }: FaadeCarouselProps) {
    return (
        <div className={`${styles.slider} ${className}`}>
            <div className={styles.slide}>
                <Image className={styles.image} src={'/1.jpg'} alt='foto desa pampang' fill />
            </div>
            <div className={styles.slide}>
                <Image className={styles.image} src={'/12.jpg'} alt='foto desa pampang' fill />
            </div>
            <div className={styles.slide}>
                <Image className={styles.image} src={'/13.jpg'} alt='foto desa pampang' fill />
            </div>
            <div className={styles.slide}>
                <Image className={styles.image} src={'/17.jpg'} alt='foto desa pampang' fill />
            </div>
            <div className={styles.slide}>
                <Image className={styles.image} src={'/20.jpg'} alt='foto desa pampang' fill />
            </div>
        </div>
    )
}