import { GetProductWithUserDto, Product, ProductDto } from "@/types"
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
    owner: dummyUser
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

export function extractProductFromDto(productWithUserDto: GetProductWithUserDto): Product {
  const user: User = {
    id: productWithUserDto.uid,
    uid: productWithUserDto.uid,
    phoneNumber: productWithUserDto.phone_number,
    username: productWithUserDto.username,
    profilePicture: productWithUserDto.profile_picture
  } 
  return {
    description: productWithUserDto.description,
    imageUrls: productWithUserDto.images,
    name: productWithUserDto.name,
    price: productWithUserDto.price + "",
    sold: productWithUserDto.sold,
    stock: productWithUserDto.stock,
    owner: user
  }
}