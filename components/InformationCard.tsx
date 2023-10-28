import Image from 'next/image'
import { Card } from './ui/card'
import { GetInformationsDto } from '@/types'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import NormalCarousel from './carousel/NormalCarousel'

interface InformationCardProps {
    className?: string,
    information: GetInformationsDto   
}

export default function InformationCard({ information }: InformationCardProps) {
    
    return (
        <Dialog>
            <DialogTrigger>
                <Card className="w-[70vw] h-44 flex items-center p-8 gap-5">
                    <div className="flex-1 flex flex-col h-full w-1/2 gap-4">
                        <h3 className="text-lg font-bold">{information.title}</h3>
                        <p className="text-sm text-muted-foreground">{information.article}</p>
                    </div>
                    <div className="h-28 w-28 aspect-square rounded-lg overflow-hidden relative">
                        <Image src={information.urls[0]} alt="thumbnail" fill style={{ 'objectFit': 'cover', 'objectPosition': 'center' }} />
                    </div>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <h3 className='font-bold'>{information.title}</h3>
                <div>
                <NormalCarousel>
                    {information.urls.map((url, i) => (<img src={url} key={i} />))}
                </NormalCarousel>
                <p className='mt-4'>{information.article}</p>
            </div>
            </DialogContent>
        </Dialog>
    )
}