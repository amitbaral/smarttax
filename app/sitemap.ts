import { siteMapQuery } from '../lib/_queries';
import { hygraphClient } from '../lib/_client';


export default async function sitemap() {
    const baseUrl = process.env.BASE_URL || 'https://smartonlinetax.com.au';
    const endPoint = process.env.END_POINT || 'https://api.hygraph.io/graphql';
    const client = hygraphClient();

    const metadataSeo: any = await client.request(siteMapQuery);

    const { pages, blogPosts, services } = metadataSeo

    const pageUrls = pages.map((page: any) => {
        return {
            url: `${baseUrl}/${page.slug}`,
            lastModified: new Date(page.createdAt).toISOString(),
            changeFrequency: 'weekly',
            priority: 1,
        }
    })

    const blogUrls = blogPosts.map((post: any) => {
        return {
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.createdAt).toISOString(),
            changeFrequency: 'daily',
            priority: 0.8,
        }
    })

    const serviceUrls = services.map((service: any) => {
        return {
            url: `${baseUrl}/services/${service.slug}`,
            lastModified: new Date(service.createdAt).toISOString(),
            changeFrequency: 'monthly',
            priority: 0.5,
        }
    })


    return [
        {
            url: baseUrl,
            lastModified: new Date().toISOString(),
            changeFrequency: 'daily',
            priority: 1,

        },
        ...pageUrls,
        ...blogUrls,
        ...serviceUrls
    ]

}