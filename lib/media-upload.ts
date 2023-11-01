import { PutBlobResult } from '@vercel/blob'
import { debug } from './utils'
import { FirebaseStorage, UploadResult, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuidV4 } from 'uuid'

// TODO: ga kepake, mau diapakan?
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

  export async function uploadImagesToFirebase(files: FileList) {
    const storage = (window as any).fbStorage as FirebaseStorage
    const uploadResultPromises: Promise<UploadResult>[] = []
    for (let index = 0; index < files.length; index++) {
        const file = files.item(index)
        const filename = `${uuidV4()}.${file?.type.split('/')[1]}`
        const storageRef = ref(storage, `VHgAfQQu0VktlMuJlxwCtmG8PuNYjPondXI/${filename}`)
        uploadResultPromises.push(uploadBytes(storageRef, file!))
    }
    const uploadResults = await Promise.all(uploadResultPromises)
    const urlPromises: Promise<string>[] = []
    for (let index = 0; index < uploadResults.length; index++) {
        urlPromises.push(getDownloadURL(uploadResults[index].ref))
    }
    return await Promise.all(urlPromises)
  }