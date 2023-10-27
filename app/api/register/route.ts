import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { v4 as uuidV4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {

    try {
        const { username, phoneNumber, password } = await req.json()
        const generatedUid = uuidV4()
        const hashedPassword = bcrypt.hashSync(password, 10)

        const result = await sql`insert into users values (${generatedUid}, ${username}, ${phoneNumber}, ${hashedPassword});`;

        return NextResponse.json(
            {
                code: 200,
                error: false,
                errorMessage: "",
                data: result.rows
            },
            { status: 200 }
        )
        
    } catch (error: any) {

        if (/duplicate key value violates unique constraint "users_username_key"/gm.test(error.message)) {
            return NextResponse.json(
                {
                    code: 500,
                    error: true,
                    errorMessage: "Username sudah digunakan",
                    data: undefined
                },
                { status: 500 }
            )
        } else {
            return NextResponse.json(
                {
                    code: 500,
                    error: true,
                    errorMessage: error.message,
                    data: undefined
                },
                { status: 500 }
            )
        }
        
    }

}