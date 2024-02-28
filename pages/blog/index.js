import Layout from '../../components/layout/Layout';
import Link from 'next/link'
import Image from 'next/image'
import NewsletterSignup from '../../components/elements/NewsletterSignup'
import BlogSlider from '../../components/slider/Blog'
import { blogPageQuery } from '../../lib/_queries'
import { hygraphClient } from '../../lib/_client'
import { parsePostData } from '../../utils/_parsePostData'
import { parsePageData } from '../../utils/_parsePageData'

export default function BlogPage({ posts, page }) {
    return (
        <Layout page={page}>
            {/* <section className="section-box">
                <div className="container mt-70">
                    <div className="row">
                        <div className="col-lg-1 col-sm-1 col-12" />
                        <div className="col-lg-10 col-sm-10 col-12 text-center">
                            <h2 className="text-heading-1 color-gray-900 mb-10">Our Blog</h2>
                            <p className="text-heading-6 color-gray-600 mt-20">From year to year we strive to invent the most innovative technology<br className="d-lg-block d-none" />that is used by both small enterprises and space enterprises.</p>
                        </div>
                        <div className="col-lg-1 col-sm-1 col-12" />
                    </div>
                </div>
                <div className="container mt-70">
                    <BlogSlider posts={posts} />
                </div>
            </section> */}
            <section className="section-box">
                <div className="container mt-30">
                    <div className="row">
                        <div className="col-lg-1 col-sm-1 col-12" />
                        <div className="col-lg-10 col-sm-10 col-12 text-center">
                            <h2 className="text-heading-1 color-gray-900 mb-10">Smart Tax & Accounting resources</h2>
                            <p className="text-body-lead-large color-gray-600 mt-20">Our extensive library of content covers a wide range of topics to help you succeed. Whether you're just starting out or looking for ways to grow, you'll find the information you need. Don't see what you're looking for? Don't hesitate to ask! We're always happy to help in any way we can.</p>
                        </div>
                        <div className="col-lg-1 col-sm-1 col-12" />
                    </div>
                </div>
                <div className="container mt-90">
                    <div className="row">
                        {posts?.length > 0 ? posts.map((post) => (
                            <div className="col-lg-4 col-sm-12 pr-30 mb-50 wow animate__animated animate__bounceIn" data-wow-delay=".5s" key={post.slug} >
                                <div className="card-grid-style-4">
                                    <span className="tag-dot">{post.category}</span>
                                    <Link href={`blog/${post.slug}` }  className="text-heading-4">
                                        {post.title}
                                    </Link>
                                    <div className="grid-4-img">
                                        <Link href={`blog/${post.slug}`}>
                                                <Image
                                                    style={{ height: 'auto' }}
                                                    src={post.coverImage.url}
                                                    alt={post.title}
                                                    width={400}
                                                    height={300}
                                                />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )) : <div>No posts available</div>}
                        
                        {posts?.map((post) => (
                            <div className="col-lg-4 col-sm-12 pr-30 mb-50 wow animate__animated animate__bounceIn" data-wow-delay=".5s" key={post.slug} >
                                <div className="card-grid-style-4">
                                    <span className="tag-dot">{post.category}</span>
                                    <Link href={`blog/${post.slug}` }  className="text-heading-4">
                                        {post.title}
                                    </Link>
                                    <div className="grid-4-img">
                                        <Link href={`blog/${post.slug}`}>
                                                <Image
                                                    style={{ height: 'auto' }}
                                                    src={post.coverImage.url}
                                                    alt={post.title}
                                                    width={400}
                                                    height={300}
                                                />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <div className="mt-20 mb-30 text-center">
                        <Link href="/blog-2"  className="btn btn-black icon-arrow-right-white">
                            Load more posts
                        </Link>
                    </div> */}
                </div>
            </section>
            <NewsletterSignup />
        </Layout>
    )

}

export async function getStaticProps({ preview = false }) {
    const client = hygraphClient(preview)
    const { page, posts } = await client.request(blogPageQuery)
    const parsedPageData = await parsePageData(page)
    const parsedPostData = await Promise.all(
        posts.map((post) => parsePostData(post))
    )
    const {seo} = parsedPostData
    return {
        props: {
            page: {...parsedPageData, ...parsedPostData},
            posts: parsedPostData,
            preview
        },
        revalidate: 60
    }
}
