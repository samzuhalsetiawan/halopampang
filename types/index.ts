import { User } from "next-auth"
import { CredentialInput } from "next-auth/providers/index"

export interface Product {
    name: string,
    price: string,
    description: string,
    stock: number,
    sold: number,
    imageUrls: string[],
    owner: User
}

export interface UserDto {
    uid: string,
    username: string,
    phone_number: string,
    hash_password: string,
    profile_picture?: string
}

export type TokoSection = "JASA" | "UMKM" | "MERCHANDISE" | "ADMIN/ADD" | "ADMIN/DELETE" | "ADMIN/EDIT" | "ADMIN/LIST" | "OTHER"