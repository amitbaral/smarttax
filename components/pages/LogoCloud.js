import Link from "next/link";
import Image from "next/image";
export const LogoCloud = ({ logoCloudTitle, companies }) => {
    const logos = companies.map((company) => {
        return (
            <div
                key={company.id}
                className="col-lg-2 col-md-3 col-sm-4 col-6 text-center"
            >
                <Link href="/#" className="item-logo box-hover-shadow hover-up">
                    <Image
                        style={{ height: "auto", cursor: "pointer" }}
                        alt={company.name}
                        src={company.logo.url}
                        width={219}
                        height={60}
                    />
                </Link>
            </div>
        );
    });

    return <div className="row justify-content-md-center  mb-50">
        <h3 className="text-center mb-20">
            <span className="tag-2">{logoCloudTitle}</span>
            </h3>
        {logos}
        </div>;
};
