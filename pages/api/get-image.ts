import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    if(!req.body.query) {
        res.status(400).json({ message: 'Keywords are required' });
        return;
    }
    try {
        const keyword = req.body.query;
        const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${keyword}`, {
            headers: {
                Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
            },
        });

        const data = await response.json();
        res.status(200).json(data.results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}