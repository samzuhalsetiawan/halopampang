import { Product, User } from "@/types"
import { type ClassValue, clsx } from "clsx"
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
    owner: dummyUser
  }
}

export function getDummyUser(): User {
  return {
    name: "Username",
    phoneNumber: "081234567890",
    profilePictureUrl: "/default_user_icon.png"
  }
}