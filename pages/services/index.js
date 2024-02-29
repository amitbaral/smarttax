import { hygraphClient } from "../../lib/_client";
import { offerQuery, servicePageQuery } from "../../lib/_queries";
import { parseServiceData } from "../../utils/_parseServiceData";
import { parsePageData } from "../../utils/_parsePageData";
import Layout from "../../components/layout/Layout";
import ServiceHero from "../../components/elements/ServiceHero";
import ServicesList from "../../components/elements/ServicesList";
import { OfferSection } from "../../components/elements/OfferSection";
import NewsletterSignup from "../../components/elements/NewsletterSignup";

export const Service = (props) => {
    const { service, page, offer } = props
    const {hero} = page
    return (
        <Layout page={page}>
            <ServiceHero hero={hero} />
            <ServicesList service={service} title={page.title} subtitle={page.subtitle.markdown}/>
            <OfferSection offer={offer} />
            <NewsletterSignup />
        </Layout>
    );
}

export async function getStaticProps({ preview = false }) {
    try {
        const client = hygraphClient(preview)
        const { service, page } = await client.request(servicePageQuery)
        const { offer } = await client.request(offerQuery);
        const parsedPageData = await parsePageData(page)
        return {
            props: {
                service: service,
                page: parsedPageData,
                offer: offer,
                preview
            },
            revalidate: 60
        }
    } catch (error) {
        console.error('Error occurred in getStaticProps:', error);
        return {
            notFound: true,
        };
    }
}

export default Service;