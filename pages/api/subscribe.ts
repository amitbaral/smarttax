import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        try {
            const data = {
                email_address: email,
                status: 'subscribed',
            };

            const apiKey = process.env.MAILCHIMP_API_KEY;
            const listId = process.env.MAILCHIMP_LIST_ID;
            const serverPrefix = apiKey?.split('-')[1];

            const mailchimpEndpoint = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${listId}/members`;

            const response = await fetch(mailchimpEndpoint, {
                method: 'POST',
                headers: {
                    Authorization: `apikey ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.status >= 400) {
                return res.status(500).json({ error: 'Could not subscribe to the list' });
            }

            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: 'Could not subscribe to the list' });
        }
    } else {
        return res.status(405).end();
    }
}