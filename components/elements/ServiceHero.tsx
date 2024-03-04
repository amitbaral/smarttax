import React from 'react';
import Link from 'next/link';

interface HeroProps {
    title: string | null;
    subtitle: string | null;
}

interface ServiceHeroProps {
    hero: HeroProps;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({ hero }) => {
    const { title, subtitle } = hero;

    return (
        <section className="section-box">
                <div className="banner-hero bg-service-1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 box-banner-left">
                                <h1 className="text-display-3 mt-30">{title}</h1>
                                <p className="text-body-lead-large color-gray-500 mt-40 pr-40">{subtitle}</p>
                                <div className="mt-40">
                                    <Link href="/contact-us" className="btn btn-black shape-square icon-arrow-right-white">Get Started</Link>
                                    <Link href="/contact-us" className="btn btn-link icon-triangle color-gray-900 ml-40">How it works</Link>
                                </div>
                            </div>
                            <div className="col-lg-5 d-none d-lg-block">
                                <div className="banner-imgs">
                                    <div className="block-1 shape-2"><img src="/assets/imgs/page/services/1/banner-2.png" alt="Smart Tax & Accounting" /></div><img src="/assets/imgs/page/services/1/banner.png" alt="Smart Tax & Accounting" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
};

export default ServiceHero;
