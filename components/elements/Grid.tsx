import WhyUs from "./WhyUs";

export default function Grid({ blocks, component }) {
    const grids = blocks.filter((item) => item.__typename === "Grid");
    const grid = grids.map((grid) => {
        if (grid.component === "whyus") {
            return <WhyUs key={grid.id} {...grid} />;
        } else if (grid.component === "Image") {
            //return <Image key={grid.id} {...grid} />;
        }
    });

    return <>{grid}</>;

}
