import { serviceQuery } from '../../lib/_queries'
import { hygraphClient } from '../../lib/_client';
import { parseServiceData } from '../../utils/_parseServiceData'
import { gql } from 'graphql-request'
import Layout from '../../components/layout/Layout';
import Link from 'next/link'
import { RichText } from '@graphcms/rich-text-react-renderer';
import Image from 'next/image';
import NewsletterSignup from '../../components/elements/NewsletterSignup';

export default function ServicePage({ service }) {
    const { title, image, excerpt, richContent } = service
    if(service["0"] === undefined) {
        service["0"] = {
            gridHeadline: "",
            gridSubtitle: "",
            columns: []
        }
    } 

    const { gridHeadline, gridSubtitle, columns } = service["0"];
    return (
        <Layout page={service}>
            <div>
                <section className="section-box">
                    <div className="banner-hero banner-head-image"
                        style={{
                            backgroundImage: `url(${image.url})`,
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <div className="container">
                            <div className="text-center">{/* <span className="tag-1 bg-6 color-green-900">{category}</span> */}
                                <h1 className="text-heading-1 color-white mt-30">{title}<br className="d-lg-block d-none" /></h1>
                                <p className="text-body-lead-large color-white mt-30">{excerpt}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box mt-50 mb-50">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8" >
                                <div className="single-detail mt-50">
                                    <RichText content={richContent && richContent.raw}
                                        renderers={{
                                            img: ({ src, title, width, height }) => {

                                                return <Image className="img-fluid" src={src} alt={title} width={width} height={height} />
                                            },
                                            h2: ({ children }) => <h2 className='text-heading-3 color-gray-600'>{children}</h2>,
                                            h3: ({ children }) => <h3 className='text-heading-4 color-gray-400 icon-power-list'>{children}</h3>,
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
                <section className="section-box box-gray-100 mt-120 mb-20">
                    <div className="container text-center">
                        <div className="row d-flex justify-content-center">
                            <div className='col-lg-2 col-sm-1 col-12'></div>
                            <div className='col-lg-8 col-sm-10 col-12 text-center mt-100'>
                                {gridHeadline && (
                                    <h2 className='text-heading-1 color-gray-900 mb-10'>
                                        {gridHeadline}
                                    </h2>
                                )}
                                {gridSubtitle && (
                                    <p className='text-body-lead-large color-gray-600 mt-20'>
                                        {gridSubtitle}
                                    </p>
                                )}
                            </div>
                            <div className='col-lg-2 col-sm-1 col-12'></div>
                        </div>
                    </div>
                    <div className="container mt-90">
                        <div className='row'>
                            {columns.map((column) => {
                                return (
                                    <div key={column.id} className='col-lg-3 col-sm-12'>
                                        <div className='card-grid-style-4'>
                                            <div className='grid-4-img mb-20'>
                                                <Image style={{ height: "auto" }} src={column.image.url} alt={column.image.alt} width={column.image.width} height={column.image.height} />
                                            </div>
                                            <div className='text-heading-4'>
                                                {column.title}
                                            </div>
                                            <p className='text-body-text color-gray-500'>
                                                {column.content}
                                            </p>
                                            <Link className='text-body-text icon-arrow-right' href='/contact-us'>Book a consultation</Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
                <NewsletterSignup />
            </div >
        </Layout >

    )

}

export async function getStaticProps({ params, preview = false }) {
    const client = hygraphClient(preview)
    const { service } = await client.request(serviceQuery, {
        slug: params.slug
    })
    if (!service) {
        return {
            notFound: true
        }
    }
    const parsedPageData = await parseServiceData(service)
    return {
        props: {
            service: parsedPageData,
            preview
        },
        revalidate: 60
    }
}

export async function getStaticPaths({ locales }) {
    let paths = []

    const client = hygraphClient()

    const { services } = await client.request(gql`
        {
            services(where: { slug_not_in: ["home", "blog"] }) {
            slug
            }
        }
    `)

    paths = [
        ...paths,
        ...services.map((service) => ({ params: { slug: service.slug } }))
    ]


    return {
        paths,
        fallback: 'blocking'
    }
}