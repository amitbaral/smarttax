import { serialize } from 'next-mdx-remote/serialize'
import he from 'he'

import { parseBlocksMdx } from './_parseBlocksMdx'

const parsePageData = async (data) => {
    if (!data) {
        throw new Error('Data is null or undefined');
    }
    const { blocks, subtitle, ...page } = data;
    return (
        {
            ...(blocks && {
                blocks: await parseBlocksMdx(blocks)
            }),
            ...(subtitle && {
                subtitle: {
                    markdown: subtitle,
                    mdx: await serialize(he.decode(subtitle))
                }
            }),
            ...page
        }
    )
}

export { parsePageData }