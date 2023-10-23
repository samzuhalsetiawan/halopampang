export interface Product {
    name: string,
    price: string,
    description: string,
    stock: number,
    sold: number,
    imageUrls: string[],
    owner: User
}

export interface User {
    name: string,
    phoneNumber: string,
    profilePictureUrl?: string
}