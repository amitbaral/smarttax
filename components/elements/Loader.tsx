import { useEffect } from "react";

// Declare the custom element type for TypeScript
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'l-ring-2': {
                size?: string | number;
                stroke?: string | number;
                'stroke-length'?: string | number;
                'bg-opacity'?: string | number;
                speed?: string | number;
                color?: string | number;
            };
        }
    }
}

export default function Loader() {
    useEffect(() => {
        async function getLoader() {
            const { ring2 } = await import("ldrs");
            ring2.register();
        }
        getLoader();
    }, []);
    return (
        <l-ring-2
            size="40"
            stroke="5"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.8"
            color="black"
        ></l-ring-2>
    );
}
