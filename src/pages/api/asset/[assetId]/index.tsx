import LivePeerApi from "services/livePeer/api";

const livePeerAPI = new LivePeerApi({ apiKey: process.env.LIVEPEER_API_KEY }, process.env.NEXT_PUBLIC_LIVEPEER_HOST)

export default async (req, res) => {
    if (req.method !== 'GET') return res.status(405).send({ message: 'Only GET requests allowed' })
    try {
        const assetId = req.query.assetId;
        const assetInfo = await livePeerAPI.getAsset(assetId)
        console.log(assetInfo)
        if (assetInfo) {
            res.status(200).json({ ...assetInfo });
        } else {
            res.status(500).json({ error: "Something went wrong" });
        }
    } catch (error: any) {
        res.status(500).json({ error });
    }
}