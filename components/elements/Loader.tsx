import { useEffect } from "react";

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



// import { ring2 } from 'ldrs'

// ring2.register()

// // Default values shown
