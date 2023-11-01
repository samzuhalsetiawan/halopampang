import { Product } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { User } from "next-auth"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDummyProduct(): Product {
  const dummyUser = getDummyUser()
  return {
    name: "Nama Produk",
    description: "Deskripsi Produk",
    imageUrls: ["/1.jpg", "/2.jpg", "/3.jpg"],
    price: "700.000",
    sold: 0,
    stock: 200,
    ownerName: "Username",
    phoneNumber: "081234567890"
  }
}

export function getDummyUser(): User {
  return {
    username: "Username",
    phoneNumber: "081234567890",
    profilePicture: "/default_user_icon.png",
    id: "id",
    uid: "id",
  }
}

type DebugLevel = "DEBUG" | "ERROR"

export function debug(title: string, data: any, level: DebugLevel = "DEBUG") {
  console.log(`===START ${title}===`)
  if (level === "ERROR") {
    console.error(data)
  } else {
    console.log(data)  
  }
  console.log(`===END ${title}===`)
}

export function urlArrayToPostgreArrayString(urls: string[]) {
  return `{${urls.slice(1).reduce((acc, current) => `${acc}, "${current}"`, `"${urls[0]}"`)}}`
}