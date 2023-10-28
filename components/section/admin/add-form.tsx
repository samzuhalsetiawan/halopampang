"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRef, useState } from "react"
import { sendAllPictureToServer } from "@/lib/media-upload"
import { useRouter } from "next/navigation"

const profileFormSchema = z.object({
  productName: z
    .string({
        required_error: "Nama produk perlu diisi"
    })
    .max(30, {
      message: "Nama produk tidak boleh lebih dari 30 karakter",
    }),
  price: z
    .string({
        required_error: "Harga perlu diisi"
    })
    .regex(/^[1-9][0-9]*$/, "Mohon hanya mengisikan dengan angka dan tidak diawali 0"),
  stock: z
    .string({
        required_error: "Stok barang perlu diisi"
    })
    .regex(/^\d+$/, "Mohon hanya mengisikan dengan angka"),
  productType: z
    .string({
      required_error: "Mohon pilih jenis produk anda",
    }),
  pictures: z
    .any(),
  description: z.string({
    required_error: "Deskripsi produk perlu diisi"
  })
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  productType: "umkm"
}

interface AddProductFormProps {
  userId: string
}

export function AddProductForm({ userId }: AddProductFormProps) {

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })
  const pictureInputRef = useRef<HTMLInputElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)
    const files = pictureInputRef.current?.files

    if (files && files.length > 0) {
      try {
        const urls = await sendAllPictureToServer(files)
        const productName = data.productName
        const stock = parseInt(data.stock)
        const price = parseInt(data.price)
        const description = data.description
        const productType = data.productType
        const owner = userId

        const response = await fetch('/api/product', {
          method: "POST",
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ 
            name: productName,
            description,
            images: urls,
            owner,
            price,
            stock,
            productType
          })
        })

        const result = await response.json()
        if (result.error) throw new Error(result.errorMessage)
        switch (productType) {
          case "umkm":
            router.push('/toko/umkm')
            break;
          case "merchandise":
            router.push('/toko/merchandise')
            break;
            default:
            router.push('/toko')
            break;
        }
      } catch (error: any) {
        console.error(error)
        alert(error.message)
      } finally {
        setIsLoading(false)
      }
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Produk</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Kerajinan khas pampang..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Produk</FormLabel>
              <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jenis Produk..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="umkm">Produk UMKM</SelectItem>
                  <SelectItem value="merchandise">Merchandise</SelectItem>
                  <SelectItem value="jasa" disabled>Jasa (Comming Soon)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Harga</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="0" {...field} />
              </FormControl>
              <FormDescription>
                Harga dalam nominal rupiah tanpa titik dan koma
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stok Barang</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pictures"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Foto produk</FormLabel>
              <FormControl>
                <Input disabled={isLoading} ref={pictureInputRef} multiple className="cursor-pointer" accept="image/*" required type="file" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Produk</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder="Jelaskan lebih detail mengenai produk anda"
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
          Selesai
        </Button>
      </form>
    </Form>
  )
}