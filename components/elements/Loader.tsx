import { useEffect, createElement } from "react";

export default function Loader() {
    useEffect(() => {
        async function getLoader() {
            const { ring2 } = await import("ldrs");
            ring2.register();
        }
        getLoader();
    }, []);
    
    // Use createElement to avoid TypeScript issues with custom elements
    return createElement('l-ring-2', {
        size: "40",
        stroke: "5",
        'stroke-length': "0.25",
        'bg-opacity': "0.1",
        speed: "0.8",
        color: "black"
    });
}
