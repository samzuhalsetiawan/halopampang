import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres'
import bcrypt from 'bcrypt'
import { SALT_ROUND } from "@/constants";

export async function GET(req: Request) {
    return NextResponse.json({ data: "ok" })
}

export async function PUT(req: Request) {
    const url = new URL(req.url)
    const userId = url.searchParams.get("uid")
    const data = new Map()
    if (!userId) {
        return NextResponse.json({
            code: 400,
            error: true,
            errorMessage: "query 'uid' is required",
            data: ""
        }, { status: 400 })
    }
    try {
        
        const body = await req.json()
        if (body.username) {
            const result = await sql`update users set username = ${body.username} where uid = ${userId};`
            data.set("username", result.rowCount)
        }
        if (body.phoneNumber) {
            const result = await sql`update users set phone_number = ${body.phoneNumber} where uid = ${userId};`
            data.set("phoneNumber", result.rowCount)
        }
        if (body.oldPassword && body.newPassword) {
            const result = await sql`select hash_password from users where uid = ${userId} limit 1`
            const user = result.rows[0]
            const isMatch = await bcrypt.compare(body.oldPassword, user.hash_password)
            if (isMatch) {
                const newHashedPassword = await bcrypt.hash(body.newPassword, SALT_ROUND)
                const result = await sql`update users set hash_password = ${newHashedPassword} where uid = ${userId}`
                data.set("password", result.rowCount)
            } else {
                throw new Error("Password Salah")
            }
        }
        if (body.profilePicture) {
            const result = await sql`update users set profile_picture = ${body.profilePicture} where uid = ${userId}`
            data.set("profilePicture", result.rowCount)
        }
        return NextResponse.json({
            code: 200,
            error: false,
            errorMessage: "",
            data
        }, { status: 200 })

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