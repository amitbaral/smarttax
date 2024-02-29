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

export async function getStaticProps({ locale, params, preview = false }) {
    try {
        const client = hygraphClient(preview);
        const response = await client.request(blogPostQuery, {
            slug: params.slug || "/",
        });

        if (!response || !response.post) {
            return {
                notFound: true,
            };
        }

        const { allPosts, page, post } = response;

        const postIndex = allPosts.findIndex(({ id }) => id === post.id);

        const nextPost = allPosts[postIndex + 1] || null;
        const previousPost = allPosts[postIndex - 1] || null;

        const parsedPostData = await parsePostData(post);
        const {seo} = parsedPostData

        return {
            props: {
                nextPost,
                page: { ...page, seo },
                post: parsedPostData,
                previousPost,
                preview,
            },
            revalidate: 60,
        };
    } catch (error) {
        console.error('Error occurred in getStaticProps:', error);
        return {
            notFound: true,
        };
    }
}

export async function getStaticPaths() {
    try {
        let paths = [];

        const client = hygraphClient();

        const { posts } = await client.request(gql`
            {
                posts: blogPosts {
                    slug
                }
            }
        `);

        paths = posts.map((post) => ({ params: { slug: post.slug } }));

        return {
            paths,
            fallback: "blocking",
        };
    } catch (error) {
        console.error('Error occurred in getStaticPaths:', error);
        return {
            paths: [],
            fallback: "blocking",
        };
    }
}