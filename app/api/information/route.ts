import { AddInformationPostBody } from '@/types'
import { v4 as uuidV4 } from 'uuid'
import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const body: AddInformationPostBody = await req.json()
        const urls = `{${body.urls.slice(1).reduce((acc, current) => `${acc}, "${current}"`, `"${body.urls[0]}"`)}}`
        const articleId = uuidV4()
        const result = await sql`insert into informations values (${articleId}, ${body.title}, ${body.article}, ${urls}, ${body.userId});`
        return NextResponse.json({
            code: 200,
            error: false,
            errorMessage: "",
            data: result.rowCount
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

export async function GET(req: Request) {
    try {
        const result = await sql`select * from informations`
        return NextResponse.json({
            code: 200,
            error: false,
            errorMessage: "",
            data: result.rows
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