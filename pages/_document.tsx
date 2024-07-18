import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
} from 'next/document'
import Image from 'next/image'
import Script from 'next/script';

class MyDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        const originalRenderPage = ctx.renderPage

        // Run the React rendering logic synchronously
        ctx.renderPage = () =>
            originalRenderPage({
                // Useful for wrapping the whole react tree
                enhanceApp: (App) => App,
                // Useful for wrapping in a per-page basis
                enhanceComponent: (Component) => Component,
            })

        // Run the parent `getInitialProps`, it now includes the custom `renderPage`
        const initialProps = await Document.getInitialProps(ctx)

        return initialProps
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <noscript>
                        <Image
                            height="1"
                            width="1"
                            alt="Facebook Pixel"
                            style={{ display: 'none' }}
                            src={`https://www.facebook.com/tr?id=201841142768236&ev=PageView&noscript=1`}
                        />
                    </noscript>
                    <meta name="msvalidate.01" content="4CD474C2B5602BA087BBDE3686C37395" />
                </Head>
                
                <body>
                    <Main />
                    <NextScript />

                    <Script
                        id="tawk-to-script"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                            (function(){
                            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                            s1.async=true;
                            s1.src='https://embed.tawk.to/6698b44732dca6db2cb18500/1i3280eca';
                            s1.charset='UTF-8';
                            s1.setAttribute('crossorigin','*');
                            s0.parentNode.insertBefore(s1,s0);
                            })();
                            `,
                        }}
                        />
                </body>
            </Html>
        )
    }
}

export default MyDocument