'use client'
import { usePathname } from 'next/navigation';
import { NextSeo } from 'next-seo'

import { defaultUrl } from '../../next-seo.config'
export default function SEO({
    id,
    image,
    keywords,
    noIndex: noindex = false,
    openGraph,
    twitter,
    ...props
}) {
    const pathname = usePathname()
    const canonicalUrl = `${defaultUrl}` + (pathname === '/' ? '' : pathname);

    const SEO = {
        ...(keywords && { keywords: keywords.toString() }),
        canonical: canonicalUrl,
        noindex,
        openGraph: {
            ...(image && {
                images: [
                    {
                        alt: props.title,
                        ...image
                    }
                ]
            }),
            url: canonicalUrl,
            ...props
        },
        twitter: {
            cardType: twitter?.card || 'summary_large_image',
            handle: twitter?.publisherHandle || '@wp_pro_au',
            site: defaultUrl,
            ...twitter
        },
        ...props
    }
    return <NextSeo {...SEO} />
}