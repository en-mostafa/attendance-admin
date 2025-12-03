export const getFileBlob = async (filename:string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/uploads/${filename}`)
    const data = await res.blob()
    return data
}