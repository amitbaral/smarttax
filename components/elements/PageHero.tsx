import { url } from 'inspector';
import React from 'react';

interface HeroProps {
    title: string | null;
    subtitle: string | null;
    image: {
        url: string | null;
        alt: string | null;
        height: number | null;
        width: number | null;
    };
}

interface PageHeroProps {
    hero: HeroProps;
}


const PageHero: React.FC<PageHeroProps> = ({ hero }) => {
    const { title, subtitle, image } = hero;

    const pageHeroImageStyle = { 
        backgroundImage: `url(${image.url})`, 
        backgroundRepeat: `no-repeat`, 
        backgroundPosition: `right top`, 
        backgroundSize: `cover`,
        minHeight: `600px`,
        display: `flex`,
        alignContent: `space-around`,
        alignItems: `center`,
    }

    return (
        <section id='page-hero' className="section-box bg-green-900 pt-90 pb-90" style={image && pageHeroImageStyle}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-sm-12 col-12">
                        {title && (
                            <h2 className="text-heading-1 color-white mb-30">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-inter-lg color-grey">
                                {subtitle}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PageHero;
