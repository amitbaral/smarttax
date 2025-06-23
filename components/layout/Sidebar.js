/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import CopyDate from "../elements/CopyDate";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";


const Sidebar = ({ openClass, navigation }) => {
    const pages = navigation.pages
    const menuItems = pages.map((page, index) => {
        return (
            <li key={page.id}>
                <Link href={`/${page.slug}`} >{page.navigationLabel}</Link>
            </li>
        )
    })

    const cssForHeader = {
        maxWidth: "100px",
        marginRight: "10px"
    }
    
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    });
    return (
        <>
            <div className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar ${openClass}`}>
                <PerfectScrollbar className="mobile-header-wrapper-inner">
                    <div className="mobile-header-top">
                        <div className={`${cssForHeader}`}>
                            <img src="/assets/imgs/template/logo.svg" alt="Smart Tax & Accounting" />
                        </div>
                    </div>
                    <div className="mobile-header-content-area">
                        <div className="perfect-scroll">
                            <div className="mobile-menu-wrap mobile-header-border">
                                <nav>
                                    <ul className="mobile-menu font-heading">
                                        {menuItems}
                                    </ul>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Link
                                            href="/contact-us"
                                            className="btn btn-default hover-up icon-arrow-right"
                                        >
                                            Book Appointment
                                        </Link>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl w-full h-[80vh]">
                                        <iframe
                                            src="https://outlook.office.com/book/SmartTaxAccounting@smartonlinetax.com.au/?ismsaljsauthenabled"
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            title="Book Appointment"
                                        />
                                    </DialogContent>
                                </Dialog>
                                </nav>
                            </div>
                            <div className="site-copyright color-gray-400">
                                <CopyDate/>
                            </div>
                        </div>
                    </div>
                </PerfectScrollbar>
            </div>
        </>
    );
};

export default Sidebar;