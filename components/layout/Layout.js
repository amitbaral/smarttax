import { useState } from 'react';
import BackToTop from "../elements/BackToTop";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import SEO from './Seo';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { defaultSEO } from '../../next-seo.config';
import FacebookPixel from '../FacebookPixel';
import { GoogleTagManager } from '@next/third-parties/google'

const Layout = ({ children, headerStyle, page }) => {
    const { seo, navigation, footer } = page;
    const [openClass, setOpenClass] = useState('');

    const handleOpen = () => {
        document.body.classList.add("mobile-menu-active");
        setOpenClass("sidebar-visible")
    }

    const handleRemove = () => {
        if (openClass === "sidebar-visible") {
            setOpenClass("")
            document.body.classList.remove("mobile-menu-active");
        }
    }
    return (
        <>
            <Head>
                <link rel="apple-touch-icon" sizes="180x180" href="../../assets/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="../../assets/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="../../assets/favicon/favicon-16x16.png" />
                <link rel="android-chrome" type="image/png" sizes="192x192" href="../../assets/favicon/android-chrome-192x192.png" />
                <link rel="android-chrome" type="image/png" sizes="512x512" href="../../assets/favicon/android-chrome-512x512.png" />
            </Head>
            {seo ? <SEO {...seo} /> : <DefaultSeo {...defaultSEO} />}
            <div className={openClass && "body-overlay-1"} onClick={handleRemove} />            <Header handleOpen={handleOpen} headerStyle={headerStyle} navigation={navigation} />
            <Sidebar openClass={openClass} navigation={navigation} handleClose={handleRemove} />
            <main className="main">
                {children}
                <FacebookPixel />
            </main>
            <Footer footer={footer} />
            <BackToTop />
            <GoogleTagManager gtmId="G-EDXZVWFRV6" />
        </>
    );
};

export default Layout;