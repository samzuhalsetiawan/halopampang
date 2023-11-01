'use client'

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { sendAllPictureToServer, uploadImagesToFirebase } from "@/lib/media-upload"
import { cn } from "@/lib/utils"
import { User } from "next-auth"
import React, { useEffect, useRef, useState } from "react"

interface ProfileMainSectionProps {
    className?: React.ReactNode,
    user: User,
}

export default function ProfileMainSection({ className = "", user }: ProfileMainSectionProps) {

    const [username, setUsername] = useState(user.username)
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber)
    const imageInputRef = useRef<HTMLInputElement>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isPhoneNumberTooShort, setIsPhoneNumberTooShort] = useState(true);
    const [isPhoneNumberDoesntStartWithZero, setIsPhoneNumberDoesntStartWithZero] = useState(true);
    const [newPassword, setNewPassword] = useState<string>("")
    const [oldPassword, setOldPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [isPasswordDoesntMatch, setIsPasswordDoesntMatch] = useState(true);
    const [isPasswordTooShort, setIsPasswordTooShort] = useState(true);
    const [showModalUploadSuccess, setShowModalUploadSuccess] = useState(false)

    useEffect(() => {
        setIsPasswordTooShort(newPassword.length < 6)
        setIsPasswordDoesntMatch(newPassword != confirmPassword)
    }, [newPassword, confirmPassword])

    useEffect(() => {
        setIsPhoneNumberTooShort(phoneNumber.length < 10)
        setIsPhoneNumberDoesntStartWithZero(phoneNumber[0] != '0')
    }, [phoneNumber])

    async function handleSubmit() {
        setIsUploading(true)
        try {
            const files = imageInputRef.current?.files
            let imageUrl: string | null | undefined = null
            if (files) {
                const urls = await uploadImagesToFirebase(files)
                imageUrl = urls.at(0)
            }
            const response = await fetch(`/api/preferences?uid=${user.uid}`, {
                method: "PUT",
                body: JSON.stringify({
                    username,
                    profilePicture: imageUrl || undefined,
                    phoneNumber,
                    newPassword,
                    oldPassword
                }),
                headers: { 'content-type': 'application/json' }
            });
            const result = await response.json()
            if (result.error) {
                throw new Error(result.errorMessage)
            } else {
                setShowModalUploadSuccess(true)
            }
        } catch (error: any) {
            console.error(error)
            alert(error.message)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className={cn("h-screen w-full flex flex-col gap-5", className)}>
            <div>
                <Label htmlFor="username">Ganti Username</Label>
                <Input disabled={isUploading} id="username" name="username" type="text" onChange={ev => setUsername(ev.currentTarget.value)} value={username} required />
            </div>
            <div>
                <Label htmlFor="phoneNumber">
                Ganti Nomor HP
                </Label>
                <Input
                id="phoneNumber"
                placeholder="No. HP, contoh: 082200001111"
                type="number"
                autoCapitalize="none"
                value={phoneNumber}
                autoCorrect="off"
                onChange={ev => setPhoneNumber(ev.currentTarget.value)}
                disabled={isUploading}
                />
                { isPhoneNumberTooShort && phoneNumber != "" && <Alert variant="destructive"><AlertDescription>Nomor HP tidak valid</AlertDescription></Alert> }
                { isPhoneNumberDoesntStartWithZero && phoneNumber != "" && <Alert variant="destructive"><AlertDescription>Nomor HP harus diawali angka 0</AlertDescription></Alert> }
            </div>
            <Dialog>
                <DialogTrigger className="flex">
                    <div className="flex flex-col items-start gap-1 flex-1">
                        <Label htmlFor="password">Ganti Password</Label>
                        <Input readOnly id="password" name="password" type="password" value={"**********"} />
                        { (newPassword != "" || oldPassword != "") && (isPasswordDoesntMatch || isPasswordTooShort) &&
                            <Alert variant={"destructive"}>Mohon masukan password dengan benar</Alert>
                        }
                    </div>
                </DialogTrigger>
                <DialogContent className="flex flex-col items-stretch gap-5">
                    <div>
                        <Label>Password Lama</Label>
                        <Input value={oldPassword} onChange={ev => setOldPassword(ev.currentTarget.value)} type="password" />
                    </div>
                    <div className="flex-1">
                        <Label>Password Baru</Label>
                        <Input value={newPassword} onChange={ev => setNewPassword(ev.currentTarget.value)} type="password" />
                        { isPasswordTooShort && newPassword != "" && <Alert variant="destructive"><AlertDescription>Password minimal 6 karakter</AlertDescription></Alert> }
                    </div>
                    <div className="flex-1">
                        <Label>Ketikan kembali password baru anda</Label>
                        <Input value={confirmPassword} onChange={ev => setConfirmPassword(ev.currentTarget.value)} type="password" />
                        { isPasswordDoesntMatch && newPassword != "" && <Alert variant="destructive"><AlertDescription>Password tidak cocok</AlertDescription></Alert> }
                    </div>
                    <DialogFooter>
                        <DialogClose>
                            <Button>Selesai</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div>
                <Label htmlFor="profile-picture">Ganti Foto Profil</Label>
                <Input disabled={isUploading} ref={imageInputRef} id="profile-picture" name="profile-picture" type="file" accept="image/png, image/jpeg" />
            </div>
            <Dialog>
                <DialogTrigger className="w-min">
                    <Button disabled={(newPassword != "" || oldPassword != "") && (isPasswordDoesntMatch || isPasswordTooShort) || isPhoneNumberDoesntStartWithZero || isPhoneNumberTooShort || isUploading} className="self-start mt-5">Simpan</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Simpan perubahan?</DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant={"secondary"}>Batal</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button onClick={() => handleSubmit()}>Yakin</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={showModalUploadSuccess} onOpenChange={setShowModalUploadSuccess}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Data user berhasil diubah</DialogTitle>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}