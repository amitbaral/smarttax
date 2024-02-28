const description = `Let us handle the business account for you and get rid of all the accounting pressure you have. We are here to help you with all your accounting and tax services.`
const title = `We help businesses like yours with accounting and tax services | Smart Tax and Accounting`
const url = `https://smartonlinetax.com.au`
const image = {
    url: `${url}/public/assets/imgs/page/blog/single/img-1.png`,
}

const seo = {
    title,
    titleTemplate: '%s | Smart Tax and Accounting',
    description,
    image,
    openGraph: {
        description,
        title,
        type: 'website',
        url
    },
    twitter: {
        handle: '@smarttax',
        site: url,
    }
}

export { seo as defaultSEO, url as defaultUrl }