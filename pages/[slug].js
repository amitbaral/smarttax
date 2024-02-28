import { gql } from 'graphql-request'
import { hygraphClient } from '../lib/_client'
import { pageQuery } from '../lib/_queries'
import { parsePageData } from '../utils/_parsePageData'
import Layout from '../components/layout/Layout'
import PageHero from '../components/elements/PageHero'
import { RichText } from '@graphcms/rich-text-react-renderer'
import Image from 'next/image'
import NewsletterSignup from '../components/elements/NewsletterSignup'


export default function Page({ page }) {
    const {  hero, excerpt, content } = page
    return (
        <>
            <Layout page={page}>
                {hero && <PageHero hero={hero} />}
                <section className="section-box mt-50 mb-50">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-12 col-md-8 col-sm-10 col-9">
                                <div className="text-summary text-center">{excerpt ? excerpt : ""}</div>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8" >
                                <div className="single-detail mt-50">
                                    <RichText content={content.raw}
                                        renderers={{
                                            img: ({ src, title, width, height }) => {
                                                return <Image className="img-fluid" src={src} alt={title} width={width} height={height} />
                                            },
                                            h2: ({ children }) => <h2 className='text-heading-3 color-gray-600'>{children}</h2>,
                                            bold: ({ children }) => <strong>{children}</strong>,
                                            li: ({ children }) => <li>{children}</li>,
                                            blockquote: ({ children }) => <blockquote><div className='box-quote'><div className='text-quote'>{children}</div></div></blockquote>,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <NewsletterSignup />
            </Layout>
        </>
    )
}

export async function getStaticProps({ params, preview = false }) {
    const client = hygraphClient(preview)

    const { page } = await client.request(pageQuery, {
        slug: params.slug
    })

    if (!page) {
        return {
            notFound: true
        }
    }

    const parsedPageData = await parsePageData(page)

    return {
        props: {
            page: parsedPageData,
            preview
        },
        revalidate: 60
    }
}

export async function getStaticPaths({ locales }) {
    let paths = []
    const client = hygraphClient()
    const { pages } = await client.request(gql`
        {
            pages(where: { slug_not_in: ["home", "blog", "services", "contact-us", "404", "about"] }) {
            slug
            }
        }
    `)
    paths = [
        ...paths,
        ...pages.map((page) => ({ params: { slug: page.slug } }))
    ]
    return {
        paths,
        fallback: 'blocking'
    }
}