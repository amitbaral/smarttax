/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState, useEffect } from "react";
const Header = ({ handleOpen, headerStyle, navigation }) => {
    const {pages} = navigation
    const [scroll, setScroll] = useState(0)
    useEffect(() => {
        document.addEventListener("scroll", () => {
            const scrollCheck = window.scrollY > 100
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck)
            }
        })
    })
    return (
        <>
            <header className={scroll ? `${headerStyle} header sticky-bar stick ` : `${headerStyle} header sticky-bar`}>
                <div className="container">
                    <div className="main-header">
                        <div className="header-left">
                            <div className="header-logo">
                                <Link href="/"  className="d-flex">
                                    {headerStyle ? <img alt="Smart Tax " src="/assets/imgs/template/logo-white.svg" /> : <img alt="Smart Tax & Accounting" src="/assets/imgs/template/logo.svg" />}
                                </Link>
                            </div>
                            <div className="header-nav">
                                <nav className="nav-main-menu d-none d-xl-block">
                                    <ul className="main-menu">
                                    <li>
                                            <Link href="/">Home</Link>
                                        </li>
                                            {pages.map((page, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <Link href={`/${page.slug}`}>{page.navigationLabel}</Link>
                                                        </li>
                                                    )
                                                })}
                                        
                                        
                                    </ul>
                                </nav>
                                <div className="burger-icon burger-icon-white" onClick={handleOpen}>
                                    <span className="burger-icon-top" /><span className="burger-icon-mid" /><span className="burger-icon-bottom" />
                                </div>
                            </div>
                        </div>
                        <div className="header-right">
                            <div className="block-signin">
                                <Link href="/contact-us"  className="btn btn-default hover-up icon-arrow-right">Get Started</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </>
    );
};

export default Header;