import '../public/assets/scss/style.scss'
import '../public/assets/css/modal.css'
import "../public/assets/css/swiper-custom.css";
import React, { useEffect, useState } from "react";
import Script from 'next/script';
import { useRouter } from 'next/router';
import * as fbq from '../lib/_fpixel';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    fbq.pageView()

    const handleRouteChange = () => {

      fbq.pageView()
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZZNJYV14G7" strategy="afterInteractive" />
      <Script id="google-analytics">
        {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
            
                gtag('config', 'G-ZZNJYV14G7');
                `}
      </Script>
      {/* Add Facebook pixel manager */}
      {/* Global Site Code Pixel - Facebook Pixel */}
      <Script
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
      />
      <Component {...pageProps} />
      <Script id='crisp' type='text/javascript' onLoad={() => {
        console.log('Script has loaded')
      }}>
        {`window.$crisp=[];window.CRISP_WEBSITE_ID="1c874f31-83e8-417b-86ab-497e534e4b99";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}
      </Script>
    </>
  )
}

export default MyApp
