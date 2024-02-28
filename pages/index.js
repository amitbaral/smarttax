import Link from "next/link";
import { useState, useEffect } from "react";
import PriceTable2 from "../components/elements/PriceTable2";
import Layout from "../components/layout/Layout";
import OfferSlider from "../components/slider/Offer";
import TestimonialSlider from "../components/slider/Testimonial";
import Image from "next/image";
import { hygraphClient } from "../lib/_client";
import {
    featuredPostQuery,
    pageQuery,
    servicePageQuery,
    testimonialsQuery,
    offerQuery
} from "../lib/_queries";
import { parsePageData } from "../utils/_parsePageData";
import { parseServiceData } from "../utils/_parseServiceData";
import BannerHero from "../components/sections/BannerHero";
import { ServiceBlock } from "../components/sections/ServiceBlock";
import { LogoCloud } from "../components/pages/LogoCloud";
import Grid from "../components/elements/Grid";
import FeaturedPosts from "../components/elements/FeaturedPosts";
import NewsletterSignup from "../components/elements/NewsletterSignup";
import { OfferSection } from "../components/elements/OfferSection";


let WOW;

if (typeof window !== 'undefined') {
    WOW = require('wowjs');
}

function Home({ page, featuredPosts, testimonials, offer, service: services }) {

    useEffect(() => {
        if (WOW) {
            const wow = new WOW.WOW({
                boxClass: 'wow',
                animateClass: 'animate__animated',
                offset: 0,
                mobile: false,
                live: true,
                scrollContainer: null,
                });
            wow.init();
        }
      }, []);

    const { blocks } = page;
    const [activeIndex, setActiveIndex] = useState(1);
    const hero = page?.hero;
    const handleOnClick = (index) => {
        setActiveIndex(index); // remove the curly braces
    };

    //find a word in a string anc change color of that word
    const findWord = (str, word) => {
        const reg = new RegExp(word, "gi");
        return str.replace(reg, `<span class="color-green-900">${word}</span>`);
    };

    // Open modal
    const [modal, setModal] = useState(false);
    const [videoLoading, setVideoLoading] = useState(true);
    const openModal = () => {
        setModal(!modal);
    };
    const spinner = () => {
        setVideoLoading(!videoLoading);
    };

    return (
        <>
            <Layout page={page}>
                <section className="section-box">
                    <BannerHero hero={hero} />
                </section>
                <div className="section-box overflow-visible mt-70">
                    <div className="container">
                        {blocks.map((item, index) => {
                            switch (item.__typename) {
                                case "LogoCloud":
                                    return <LogoCloud key={index} {...item} />;
                                default:
                                    return null;
                            }
                        })}
                        {blocks.map((item, index) => {
                            switch (item.columnComponent) {
                                case "FAQCard":
                                // return <LogoCloud key={index} {...item} />;
                                default:
                                    return null;
                            }
                        })}
                    </div>
                </div>
                
                <section className="section-box">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2 col-sm-1 col-12" />
                            <div className="col-lg-8 col-sm-10 col-12 text-center mt-100 container wow animate__animated animate__fadeInUp"  data-wow-delay=".2s">
                                <h2 className="text-heading-1 color-gray-900">
                                    Flexible Managed
                                    <br className="d-lg-block d-none" />
                                    Accounting Services
                                </h2>
                                <p className="text-body-lead-large color-gray-600 mt-20">
                                Unlock financial success with Smart Tax & Accounting expert accounting services. Our dedicated team ensures precision, allowing you to focus on business growth. Trust us to handle the numbers, empowering your journey to prosperity.
                                </p>
                            </div>
                            <div className="col-lg-2 col-sm-1 col-12" />
                        </div>
                    </div>
                    <div className="container mt-70">
                        <div className="row">
                            {services?.map((service, index) => {
                                const { id } = service || {};
                                return <ServiceBlock key={id} service={service} delay={index}/>;
                            })}
                            ;
                        </div>
                    </div>
                </section>
                <Grid blocks={blocks} component="WhyUs" />
                <OfferSection offer={offer} />
               
                <FeaturedPosts featuredPosts={featuredPosts} />
                <TestimonialSlider testimonials={testimonials} />
                <NewsletterSignup />
            </Layout>
        </>
    );
}

export async function getStaticProps({ preview = false }) {
    const client = hygraphClient(preview);

    const { service } = await client.request(servicePageQuery);
    const { featuredPost } = await client.request(featuredPostQuery);
    const { testimonials } = await client.request(testimonialsQuery);
    const { offer } = await client.request(offerQuery);

    const { page } = await client.request(pageQuery, {
        slug: "home",
    });

    const parsedPageData = await parsePageData(page);

    return {
        props: {
            service: service,
            page: parsedPageData,
            featuredPosts: featuredPost,
            testimonials: testimonials,
            offer: offer,
            preview,
        },
        revalidate: 60,
    };
}

export default Home;
