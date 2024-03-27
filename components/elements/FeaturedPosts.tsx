import Link from "next/link";
import Image from "next/image";

export default function FeaturedPosts({ ...posts }) {
    const { featuredPosts } = posts
    return (
        <section className="section-box mt-110">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <h3 className="text-heading-1 mb-10  wow animate__animated animate__fadeInUp" data-wow-delay=".2s">Latest News</h3>
                        <p className="text-body-lead-large color-gray-600 wow animate__animated animate__fadeInUp" data-wow-delay=".5s">
                        Sign up now and stay ahead in the accounting game with our exclusive subscription!
                        </p>
                    </div>
                    <div className="col-lg-4 text-lg-end text-start pt-30">
                        <Link href="/blog" className="btn btn-black icon-arrow-right-white">View More</Link>
                    </div>
                </div>
            </div>
            <div className="container mt-90">
                <div className="row">
                    {
                        featuredPosts.map((post, index) => {
                            const { id, slug, title, coverImage } = post
                            return (
                                <div key={id} className="col-lg-4 col-sm-12 pr-30 wow animate__animated animate__fadeInUp" data-wow-delay={`${index+1/2}s`}>
                                    <div className="card-grid-style-4">
                                        <span className="tag-dot">BLOG</span>
                                        <Link href={`/blog/${slug}`} className="text-heading-4">
                                            {title}</Link>
                                        <div className={`grid-4-img color-bg-${index}`}>
                                            <Link href={`/blog/${slug}`} >
                                                <Image style={{ height: 'auto' }} height={`1290`} width={`825`} src={coverImage.url} alt="Smart Tax & Accounting" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
