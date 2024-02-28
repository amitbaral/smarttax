'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import * as pixel from '../lib/_fpixel'

const FacebookPixel = () => {
    const [loaded, setLoaded] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        if (!loaded) return
        pixel.pageView()
    }, [pathname, loaded])

    return (
        <div>
            <Script
                id="fb-pixel"
                src=""
                strategy="afterInteractive"
                onLoad={() => setLoaded(true)}
                data-pixel-id={pixel.FB_PIXEL_ID}
            />
        </div>
    )
}

export default FacebookPixel