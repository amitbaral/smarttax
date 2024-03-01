import { blogPostQuery } from '../../lib/_queries'
import { hygraphClient } from '../../lib/_client'
import { parsePostData } from '../../utils/_parsePostData'
import { gql } from 'graphql-request'
import Layout from '../../components/layout/Layout';
import Link from 'next/link'
import { RichText } from '@graphcms/rich-text-react-renderer';
import Image from 'next/image';
import NewsletterSignup from '../../components/elements/NewsletterSignup';

export default function BlogPost({ nextPost, post, page, previousPost }) {
    const { title, content, coverImage,  excerpt, category } = post

    const excerptGenerator = (content) => {
        // const excerpt = content.replace(/(<([^>]+)>)/gi, "").split(" ").slice(0, 50).join(" ") + "...";
        // return excerpt
    }

    let customExcerpt = excerptGenerator(content)

    if(page.seo === null) {
        page.seo = {
            "id": "clmh63f8bmkpf0b1e6ntqgrgy",
            "keywords": [],
            "noIndex": false,
            "title": title,
            "description": excerpt ? excerpt : '',
            "image": {
                "id": "clmbuswobb9820b1do7xzyweh",
                "height": 630,
                "width": 1200,
                "url": coverImage.url
            },
            "openGraph": {
                "url": `https://wppro.au/blog/${post.slug}`,
                "title": title,
                "stage": "PUBLISHED",
                "image": [
                    {
                        "url": coverImage.url
                    }
                ],
                "description": excerpt,
                "id": "clmh63f8cmkpi0b1etajb2vik"
            },
            "twitter": {
                "card": "summary_large_image",
                "description": excerpt,
                "id": "clmh63f8bmkpg0b1e5gocj1cr",
                "publisherHandle": "@wp_pro_au",
                "title": title
            }
        }
    }

    return (
        <>
            <Layout page={page}>
                <div>
                    <section className="section-box">
                        <div className="banner-hero banner-head-image"
                            style={{
                                backgroundImage: `url(${coverImage.url})`,
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <div className="container">
                                <div className="text-center"><span className="tag-1 bg-2 color-gray-800">{category}</span>
                                    <h1 className="text-heading-1 color-white mt-30">{title}<br className="d-lg-block d-none" /></h1>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section-box mt-50 mb-50">
                        <div className="container">
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-12 col-md-8 col-sm-10 col-9">
                                    <div className="text-summary text-center">{excerpt}</div>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-8" >
                                    <div className="single-detail mt-50">
                                        <RichText content={content.markdown.raw} 
                                        renderers={{
                                            img: ({ src, title, width, height }) => {
                                                return <Image className="img-fluid" src={src} alt={title} width={width} height={height}/>
                                            },
                                            h2: ({ children }) => <h2 className='text-heading-3 color-gray-600'>{children}</h2>,
                                            h3: ({ children }) => <h3 className='text-heading-4 color-gray-600'>{children}</h3>,
                                            h4: ({ children }) => <h4 className='text-heading-5 color-gray-600'>{children}</h4>,
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
                </div>
            </Layout>

        </>
    );
}

export async function getStaticProps({ locale, params, preview = false }) {
    try {
        const client = hygraphClient(preview);
        const response = await client.request(blogPostQuery, {
            slug: params.slug,
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
