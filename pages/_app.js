import '../public/assets/scss/style.scss'
import '../public/assets/css/modal.css'
import "../public/assets/css/swiper-custom.css";
import React, { useEffect, useState } from "react";
import Script from 'next/script';
import { useRouter } from 'next/router';
import * as fbq from '../lib/_fpixel';
import '../styles/globals.css'  
function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  return (
    <>
      {/* Add Facebook pixel manager */}
      {/* Global Site Code Pixel - Facebook Pixel */}
      {/* <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '201841142768236');
          `,
        }}
      /> */}
      <Script src="https://amitbaral.com/script.js" type="text/javascript" />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
