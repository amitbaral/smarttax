import OfferSlider from '../slider/Offer'

export const OfferSection = ({ ...offers }) => {
    const { offer } = offers
    const [{ title, subtitle, offer: offerList }] = offer;
    return (
        <section className="section-box">
            <div className="mt-120">
                <div className="bg-2 pattern-white pb-60">
                    <div className="row">
                        <div className="col-lg-2 col-sm-1 col-12" />
                        <div className="col-lg-8 col-sm-10 col-12 text-center mt-70">
                            <h2 className="text-heading-1 color-gray-900 wow animate__animated animate__fadeInUp" data-wow-delay=".2s">
                                {title}
                            </h2>
                            <p className="text-body-lead-large color-gray-600 mt-20 wow animate__animated animate__fadeInUp" data-wow-delay=".5s">
                                {subtitle}
                            </p>
                        </div>
                        <div className="col-lg-2 col-sm-1 col-12" />
                    </div>
                    <div className="container mt-70 wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                        <OfferSlider offers={offerList} />
                    </div>
                </div>
            </div>
        </section>
    )
}