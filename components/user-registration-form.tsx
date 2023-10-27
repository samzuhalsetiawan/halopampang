"use client"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "./ui/alert"
import { useRouter } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserRegistrationForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [username, setUsername] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [isPasswordDoesntMatch, setIsPasswordDoesntMatch] = useState(true);
  const [isPasswordTooShort, setIsPasswordTooShort] = useState(true);
  const [isPhoneNumberTooShort, setIsPhoneNumberTooShort] = useState(true);
  const [isPhoneNumberDoesntStartWithZero, setIsPhoneNumberDoesntStartWithZero] = useState(true);


  useEffect(() => {
      setIsPasswordTooShort(password.length < 6)
      setIsPasswordDoesntMatch(password != confirmPassword)
  }, [password, confirmPassword])

  useEffect(() => {
      setIsPhoneNumberTooShort(phoneNumber.length < 10)
      setIsPhoneNumberDoesntStartWithZero(phoneNumber[0] != '0')
  }, [phoneNumber])

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/register', {
        method: "POST",
        body: JSON.stringify({ username, phoneNumber, password })
      })
      const result = await response.json()
      if (result.error) throw new Error("Result Error")
      router.push("/login")
    } catch (error) {
      console.error(error)
      alert(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username ..."
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              onChange={ev => setUsername(ev.currentTarget.value)}
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="phoneNumber">
              No. HP
            </Label>
            <Input
              id="phoneNumber"
              placeholder="No. HP, contoh: 082200001111"
              type="number"
              autoCapitalize="none"
              autoCorrect="off"
              onChange={ev => setPhoneNumber(ev.currentTarget.value)}
              disabled={isLoading}
            />
            { isPhoneNumberTooShort && phoneNumber != "" && <Alert variant="destructive"><AlertDescription>Nomor HP tidak valid</AlertDescription></Alert> }
            { isPhoneNumberDoesntStartWithZero && phoneNumber != "" && <Alert variant="destructive"><AlertDescription>Nomor HP harus diawali angka 0</AlertDescription></Alert> }
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password..."
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              onChange={ev => setPassword(ev.currentTarget.value)}
              disabled={isLoading}
            />
            { isPasswordTooShort && password != "" && <Alert variant="destructive"><AlertDescription>Password minimal 6 karakter</AlertDescription></Alert> }
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="confirmPassword">
              Konfirmasi Password
            </Label>
            <Input
              id="confirmPassword"
              placeholder="Konfirmasi Password..."
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              onChange={ev => setConfirmPassword(ev.currentTarget.value)}
              disabled={isLoading}
            />
            { isPasswordDoesntMatch && password != "" && <Alert variant="destructive"><AlertDescription>Password tidak cocok</AlertDescription></Alert> }
          </div>
          <Button disabled={isLoading || isPhoneNumberTooShort || isPhoneNumberDoesntStartWithZero || isPasswordTooShort || isPasswordDoesntMatch}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Daftar
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Atau gunakan
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}