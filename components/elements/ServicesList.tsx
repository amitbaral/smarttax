import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ServicesList = ({ service: services, title, subtitle }) => {
    return (
        <section className="section-box mt-120 mb-50">
            <div className="service-list bg-service-list">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-1 col-sm-1 col-12"></div>
                        <div className="col-lg-10 col-sm-10 col-12 text-center">
                            <h2 className="text-heading-1 color-gray-900 mb-10">{title}</h2>
                            <p className="text-body-lead-large color-gray-600 mt-20">{subtitle}</p>
                        </div>
                        <div className="col-lg-1 col-sm-1 col-12"></div></div>
                    <div className="row container mt-70">
                        {services.map((service) => {
                            return (
                                <div key={service.id} className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-24 wow animate__animated animate__fadeIn">
                                    <div className="service-list-item card-grid-1 bg-5 bg-business hover-up">
                                        <div className="grid-1-img">
                                            <Image src={service.darkIcon.url} alt={service.title} width={60} height={60} />
                                        </div>
                                        <h3 className="text-heading-3 mt-24 mb-24">{service.title}</h3>
                                        <p className="text-body-excerpt mt-20">{service.excerpt}</p>
                                        <div className="mt-30">
                                            <Link href={`services/${service.slug}`} className="btn btn-default btn-white icon-arrow-right">Learn more</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesList;
