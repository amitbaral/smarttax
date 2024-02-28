import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
} from 'next/document'
import Image from 'next/image'

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
                </body>
            </Html>
        )
    }
}

export default MyDocument