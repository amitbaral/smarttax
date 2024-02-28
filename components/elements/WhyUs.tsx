import Image from 'next/image'

export default function WhyUs({ gridTitle, gridHeadline, gridSubtitle, columns, image }) {
    return (

        <section className="section-box">
            <div className="container mt-100">
                <div className="row">
                    <div style={{height:'auto'}} className="col-lg-6 col-sm-12 block-img-we-do wow animate__animated animate__fadeIn" data-wow-delay="0.5s" >



                        <Image  style={{height:'auto'}} height={2214} width={1911} className="bdrd-16 img-responsive" src={image.url} alt="WP Pro" />
                    </div>
                    <div className="col-lg-6 col-sm-12 block-we-do">
                        <span className="tag-1 wow animate__animated animate__bounceInRight " data-wow-delay="0.5s">{gridTitle}</span>
                        <h3 className="text-heading-1 mt-30 wow animate__animated animate__fadeInRight" data-wow-delay="1s">
                            {gridHeadline}
                        </h3>
                        <p className="text-body-lead-large color-gray-600 mt-30  wow animate__animated animate__fadeInRight " data-wow-delay="1.5s">
                            {gridSubtitle.markdown}
                        </p>
                        <div className="line-bd-green mt-50" />
                        <div className="row">
                            {
                                columns.map((column, index) => {
                                    return (
                                        <div key={column.id} className="col-lg-6 col-sm-6 col-12 mt-50 wow animate__animated animate__fadeIn " data-wow-delay={`${index+1}s`}>
                                            <h4 className="text-heading-6 icon-leaf">
                                                {column.title}
                                            </h4>
                                            <p className="text-body-excerpt color-gray-600 mt-15">
                                                {column.content.markdown}
                                            </p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}