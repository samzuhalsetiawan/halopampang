import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
    className?: string
}

export default function Navbar({ className }: NavbarProps = { className: "" }) {

    return (
        <div className={`h-28 w-screen px-16 flex justify-between items-center shadow backdrop-blur ${className}`}>
            <div className="h-full cursor-pointer aspect-square relative">
                <Image src={'/logo.png'} alt="logo halopampang" fill />
            </div>
            <div className="flex h-full justify-end items-center gap-8">
                <ul className="flex gap-6">
                    <li className="hover:text-sky-500 py-3 cursor-pointer transition border-b border-b-transparent hover:border-b hover:border-b-sky-500" key={'beranda'}>
                        <Link href={'/'}>Beranda</Link>
                    </li>
                    <li className="hover:text-sky-500 py-3 cursor-pointer transition border-b border-b-transparent hover:border-b hover:border-b-sky-500" key={'beranda'}>
                        <Link href={'/informasi'}>Informasi</Link>
                    </li>
                    <li className="hover:text-sky-500 py-3 cursor-pointer transition border-b border-b-transparent hover:border-b hover:border-b-sky-500" key={'beranda'}>
                        <Link href={'/toko'}>Toko</Link>
                    </li>
                    <li className="hover:text-sky-500 py-3 cursor-pointer transition border-b border-b-transparent hover:border-b hover:border-b-sky-500" key={'beranda'}>
                        <Link href={'/tentang'}>Tentang</Link>
                    </li>
                    <li className="hover:text-sky-500 py-3 cursor-pointer transition border-b border-b-transparent hover:border-b hover:border-b-sky-500" key={'beranda'}>
                        <Link href={'/login'}>Login</Link>
                    </li>
                </ul>
                <div className="h-2/5 cursor-pointer aspect-square relative rounded-full overflow-hidden">
                    <Image src={'/default_user_icon.png'} alt="logo halopampang" fill />
                </div>
            </div>
        </div>
    )
}