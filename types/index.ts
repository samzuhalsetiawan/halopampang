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

export interface AddInformationPostBody {
    userId: string,
    title: string,
    article: string,
    urls: string[]
}

export interface GetInformationsDto {
    id: string,
    title: string,
    article: string,
    urls: string[],
    created_by: string,
    created_at: string
}

export type ProductType = "umkm" | "merchandise" | string

export interface ProductDto {
    pid: string,
    name: string,
    stock: number,
    price: number,
    sold: number,
    rating: number,
    description: string,
    images: string[],
    owner: string,
    product_type: ProductType
}

export interface GetProductWithUserDto {
    pid: string,
    name: string,
    stock: number,
    price: number,
    sold: number,
    rating: number,
    description: string,
    images: string[],
    product_type: ProductType,
    added_at: string,
    uid: string,
    username: string,
    phone_number: string,
    profile_picture: string
}