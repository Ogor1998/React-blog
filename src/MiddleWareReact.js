
export default async function LinkCopy(id, setMessage) {
    const newUrl = `http://localhost:5173/posts/${id}`
    console.log('This copy tab is working:', newUrl)
    await navigator.clipboard.writeText(newUrl);
    setMessage("Post Link Copied")
}