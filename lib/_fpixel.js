export const FB_PIXEL_ID = "201841142768236";
export const MAIL_GUN = process.env.ADMIN_EMAIL
export const pageView = () => {
    window.fbq('track', 'PageView', {
        page_path: window.location.pathname,
    })
}


// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
    window.fbq('track', name, options)
}