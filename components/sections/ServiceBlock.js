import Link from "next/link";
import Image from "next/image";
import { ButtonTypes } from "../../enums/buttonType";

export const ServiceBlock = ({service, delay}) => {
    const {title, excerpt, slug, image, darkIcon, lightIcon} = service;
    return (
        <div className="col-lg-3 col-sm-12 mb-20 wow animate__animated animate__fadeInUp"  data-wow-delay={`${delay/2}s`}>
            <div className="card-grid-1 bg-5 bg-business hover-up" style={{
                height: '100%'
            }}>
                <div className="grid-1-img">
                  {
                        darkIcon && ( <Image src={darkIcon?.url} alt={title} width={80} height={80}/>)
                  }
                </div>
                <h3 className="text-heading-4 mt-20">
                    {title}
                </h3>
                <p className="text-body-excerpt mt-20">
                    {excerpt}
                </p>
                <div className="mt-30">
                    <Link href={`services/${slug}` } className="btn btn-default btn-white icon-arrow-right">Learn more</Link>
                </div>
            </div>
        </div>
    )
}