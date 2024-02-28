import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    //get server year, month, day, hour, minute, second
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return res.status(200).json({
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        second: second
    })
};

export default handler;