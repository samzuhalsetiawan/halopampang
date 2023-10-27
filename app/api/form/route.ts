import path from 'path'
import { google } from 'googleapis'
import { authenticate } from '@google-cloud/local-auth'
import { NextResponse } from 'next/server';
import getConfig from 'next/config';

export async function GET(req: Request) {

    try {
        const formID = "19aFPBCL0IiLPdWdmO5Qcp1-sET4CRt-yoI_YZ-A_ttU"
        const { serverRuntimeConfig } = getConfig()
        const auth = await authenticate({
            keyfilePath: path.join(serverRuntimeConfig.PROJECT_ROOT, 'credentials.json'),
            scopes: 'https://www.googleapis.com/auth/forms.body.readonly',
        });
        const forms = google.forms({
            version: 'v1',
            auth: auth,
        });
        const res = await forms.forms.get({formId: formID});
        console.log(res.data);

        return NextResponse.json(res.data)
    } catch (error) {
        console.error(error)
        return NextResponse.json(error)
    }
    
}