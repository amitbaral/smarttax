// Upload Image using HyGraph

import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    // // secure this API route
    // if (req.headers.authorization !== process.env.HYGRAPH_ASSET_TOKEN) {
    //     return res.status(401).json({ error: 'Unauthorizedxx' });
    // }

    try {
        // Create a new object with only the imageURL property
        const { imageURL } = req.body;

        const response = await fetch(`${process.env.HYGRAPH_ENDPOINT}/upload`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.HYGRAPH_ASSET_TOKEN}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `url=${encodeURIComponent(imageURL)}`,
        });

        const data = await response.json();
        res.status(200).json({ message: 'Image uploaded successfully', imageID: data.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}