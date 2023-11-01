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
            result = await sql`select * from products where product_type = ${productType}`
        } else {
            result = await sql`select * from products`
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
            ownerName: owner_name,
            price,
            productType: product_type,
            stock,
            phoneNumber: phone_number
        } = await req.json()
        const pid = uuidV4()
        const rating = 0
        const sold = 0
        const urls = urlArrayToPostgreArrayString(images)
        debug("urls SERVER", urls)

        const result = await sql`insert into products (
            pid, name, stock, price, rating, sold, product_type, description, images, owner_name, phone_number
        ) values (
            ${pid}, ${name}, ${stock}, ${price}, ${rating}, ${sold}, ${product_type}, ${description}, ${urls}, ${owner_name}, ${phone_number}
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