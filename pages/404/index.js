/* eslint-disable @next/next/no-img-element */
import { gql } from 'graphql-request'
import { hygraphClient } from '../../lib/_client'
import { pageQuery } from '../../lib/_queries'
import { parsePageData } from '../../utils/_parsePageData'
import Layout from '../../components/layout/Layout'
import Link from 'next/link'


const Page404 = ({ page }) => {
    return (
        <>
            <Layout page={page} >
                <section className="section-box mt-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center mt-40">
                                <img className="img-responsive" src="assets/imgs/template/404.png" alt="WP Pro" />
                                <h2 className="text-heading-1 color-gray-900 mb-20 mt-50">
                                    Whoops! That page doesn’t exist.
                                </h2>
                                <p className="text-heading-5 color-gray-600 mt-30 mb-70">
                                    The page you requested could not be found, please try again later.
                                </p>
                                <div className="text-center mb-50">
                                    <Link href="/" legacyBehavior>
                                        <a className="btn btn-black icon-arrow-left">Back to Homepage</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </Layout>

        </>
    )
}


export async function getStaticProps({ locale, preview = false }) {
    const client = hygraphClient(preview)

    const { page } = await client.request(pageQuery, {
        locale,
        slug: '404'
    })
    const parsedPageData = await parsePageData(page)
    return {
        props: {
            page: parsedPageData,
            preview
        },
        revalidate: 60
    }
}

export default Page404