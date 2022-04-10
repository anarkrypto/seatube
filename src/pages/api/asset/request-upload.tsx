import LivePeerApi, { prodApiEndpoint } from "../api"

const livePeerAPI = new LivePeerApi({ apiKey: process.env.NEXT_PUBLIC_LIVEPEER_API_KEY }, prodApiEndpoint)

export default async (req, res) => {

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    console.log(req.body, typeof(req.body))
    const body = req.body
    const assetName = body.name
    try {
        const response = await livePeerAPI.requestUploadUrl(assetName)
        if (response) {
            console.log(response)
            res.statusCode = 200;
            res.json({ ...response });
        } else {
            res.statusCode = 500;
            res.json({ error: "Something went wrong" });
        }
    } catch (error: any) {
        res.statusCode = 500;
        res.json({ error });
    }
}