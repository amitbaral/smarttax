import Link from "next/link";
import Image from 'next/image';
import CopyDate from "../elements/CopyDate";

const Footer = ({footer}) => {
    const {secondaryLinks} = footer;

    return (
        <footer className="footer mt-50">
            <div className="container">
                <div className="footer-top">
                    <div className="row">
                        <div className="col-md-4 col-sm-6 text-center text-md-start">
                            <Link href="/" >
                                    <Image src="/assets/imgs/template/logo.svg" alt="WP Pro" width={162} height={42}/>
                            </Link>
                        </div>
                        <div className="col-md-8 col-sm-6 text-center text-md-end">
                            <span className="color-gray-900 text-heading-6 mr-30 text-mb-sm-20">Ready to get started?</span>
                            <Link  className="btn btn-square" href="/contact-us">
                                Consult a Specialist
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom mt-20">
                    <div className="row">
                        <div className="col-md-8 col-sm-6">
                            <ul className="row">
                                <li className="col-sm-6 col-md-4 col-lg-4 text-center text-sm-start">
                                    <CopyDate />
                                </li>

                                <li className="col-sm-6 col-md-4  col-lg-6 text-center text-sm-start">
                                    {secondaryLinks && secondaryLinks.map((link) => (
                                        <Link className="text-body-text color-gray-400 ml-20" href={`/${link.slug}`} key={link.id}>
                                            {link.navigationLabel || "Link"}
                                        </Link>
                                    ))}
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 col-sm-6 text-center text-lg-end text-md-end">
                            <div className="footer-social">
                                <Link href="https://www.facebook.com/100095223115399"  className="icon-socials icon-facebook">
                                </Link>
                                <Link href="https://twitter.com/wp_pro_au/"  className="icon-socials icon-twitter">
                                </Link>
                                <Link  className="icon-socials icon-linkedin" href="https://www.linkedin.com/company/96361283/">
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;