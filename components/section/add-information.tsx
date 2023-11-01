"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { AddInformationPostBody } from "@/types"
import { Icons } from "@/components/icons"
import { sendAllPictureToServer, uploadImagesToFirebase } from "@/lib/media-upload"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

const informationFormSchema = z.object({
  title: z
    .string({
        required_error: "Judul perlu diisi"
    })
    .max(100, {
      message: "Judul tidak boleh lebih dari 100 karakter",
    }),
  pictures: z
    .any(),
  article: z.string({
    required_error: "Artikel perlu diisi"
  })
})

type InformationFormValues = z.infer<typeof informationFormSchema>

const defaultValues: Partial<InformationFormValues> = {}

  async function uploadInformation({ userId, title, article, urls }: AddInformationPostBody) {
    try {
        const response = await fetch('/api/information', {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({userId, title, article, urls })
        })
        const data = await response.json()
        if (data.error) {
            console.error(data)
            alert(data.errorMessage)
            return null
        } else {
            return data
        }
    } catch (error: any) {
        console.error(error)
            alert(error.message)
            return null
    }
  }

interface AddInformationFormProps {
    userId: string
}

export function AddInformationForm({ userId }: AddInformationFormProps) {
  const form = useForm<InformationFormValues>({
    resolver: zodResolver(informationFormSchema),
    defaultValues,
    mode: "onChange",
  })
  const pictureInputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  async function onSubmit(data: InformationFormValues) {
    setIsLoading(true)
    const files = pictureInputRef.current?.files

    if (files && files.length > 0) {
        const urls = await uploadImagesToFirebase(files)
        const result = await uploadInformation({userId, title: data.title, article: data.article, urls})
        if (result) {
          setShowSuccessModal(true)
          router.push("/informasi")
        }
        setIsLoading(false)
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Judul ..." {...field} />
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
                <Input disabled={isLoading} ref={pictureInputRef} className="cursor-pointer" multiple accept="image/*" required type="file" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="article"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Artikel</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder="Penjelasan lebih detail ..."
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
            Posting
        </Button>
      </form>
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Informasi berhasil diupload!</DialogTitle>
            </DialogHeader>
          </DialogContent>
      </Dialog>
    </Form>
  )
}