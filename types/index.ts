
export interface Product {
    name: string,
    price: string,
    description: string,
    stock: number,
    sold: number,
    imageUrls: string[],
    ownerName: string,
    phoneNumber: string,
}

export interface UserDto {
    uid: string,
    username: string,
    phone_number: string,
    hash_password: string,
    profile_picture?: string
}

export type TokoSection = "JASA" | "UMKM" | "MERCHANDISE" | "ADMIN/ADD" | "ADMIN/DELETE" | "ADMIN/EDIT" | "ADMIN/LIST" | "OTHER"

export type ProfileSection = "PROFILE" | "SETTINGS"

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
    product_type: ProductType,
    added_at: string,
    owner_name: string,
    phone_number: string,
}

export function dtoToProduct(productDto: ProductDto): Product {
    return {
        description: productDto.description,
        imageUrls: productDto.images,
        name: productDto.name,
        ownerName: productDto.owner_name,
        phoneNumber: productDto.phone_number,
        price: productDto.price.toString(),
        sold: productDto.sold,
        stock: productDto.sold
    }
}