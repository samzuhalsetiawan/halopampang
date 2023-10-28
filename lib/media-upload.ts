import { PutBlobResult } from '@vercel/blob'

export async function sendAllPictureToServer(files: FileList) {
    try {
        const promises: Promise<Response>[] = []
        for (let i = 0; i < files.length; i++) {
            const file = files.item(i)
            if (!file) continue
            promises.push(
                fetch('/api/upload', {
                    method: "POST",
                    headers: { 'content-type': file.type || 'application/octet-stream'},
                    body: file
                })
            )
        }
        const responses = await Promise.all(promises)
        const putBlobsResults: PutBlobResult[] = await Promise.all(responses.map(response => response.json()))
        return putBlobsResults.map(blob => blob.url)
    } catch (error) {
        console.error(error)
        return []
    }
  }