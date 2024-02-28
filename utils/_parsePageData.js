import { serialize } from 'next-mdx-remote/serialize'
import he from 'he'

import { parseBlocksMdx } from './_parseBlocksMdx'

const parsePageData = async ({ blocks, subtitle, ...page }) => {
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