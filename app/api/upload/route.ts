import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { v4 as uuidV4 } from 'uuid'; 

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const file = request.body || ''
        const contentType = request.headers.get("content-type") || "text/plain"
        const filename = `${uuidV4()}.${contentType.split('/')[1]}`
     
        const blob = await put(filename, file, {
            contentType,
            access: 'public',
        });
     
        return NextResponse.json(blob);
        
    } catch (error: any) {
        
        return NextResponse.json({ errorMessage: error.message }, { status: 500 })

    }
}