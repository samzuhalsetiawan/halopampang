import { v4 as uuidV4 } from 'uuid';
import { sql } from '@vercel/postgres'
import { NextResponse } from "next/server";
import { debug, urlArrayToPostgreArrayString } from "@/lib/utils";

export async function GET(req: Request) {
    const url = new URL(req.url)
    const productType = url.searchParams.get("type")
    try {
        let result = null
        if (productType) {
            result = await sql`select
                products.pid,
                products.name,
                products.stock,
                products.price,
                products.sold,
                products.rating,
                products.description,
                products.images,
                products.product_type,
                products.added_at,
                users.uid,
                users.username,
                users.phone_number,
                users.profile_picture
             from products join users on products.owner = users.uid where products.product_type = ${productType}`
        } else {
            result = await sql`select
                products.pid,
                products.name,
                products.stock,
                products.price,
                products.sold,
                products.rating,
                products.description,
                products.images,
                products.product_type,
                products.added_at,
                users.uid,
                users.username,
                users.phone_number,
                users.profile_picture
             from products join users on products.owner = users.uid`
        }
        if (result) {
            return NextResponse.json({
                code: 200,
                error: false,
                errorMessage: "",
                data: result.rows
            }, { status: 200 })
        } else throw new Error("result undefined or null")
    } catch (error: any) {
        console.error(error)
        return NextResponse.json({
            code: 500,
            error: true,
            errorMessage: error.message,
            data: ""
        }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const {
            description,
            images,
            name,
            owner,
            price,
            productType: product_type,
            stock
        } = await req.json()
        const pid = uuidV4()
        const rating = 0
        const sold = 0
        const urls = urlArrayToPostgreArrayString(images)

        const result = await sql`insert into products (
            pid, name, stock, price, rating, sold, product_type, description, images, owner
        ) values (
            ${pid}, ${name}, ${stock}, ${price}, ${rating}, ${sold}, ${product_type}, ${description}, ${urls}, ${owner}
        );`

        if (result) {
            return NextResponse.json({
                code: 200,
                error: false,
                errorMessage: "",
                data: result.rowCount
            }, {status: 200})
        } else throw new Error("Result undefined or null")
    } catch (error: any) {
        console.error(error)
        return NextResponse.json({
            code: 500,
            error: true,
            errorMessage: error.message,
            data: ""
        }, { status: 500 })
    }
}