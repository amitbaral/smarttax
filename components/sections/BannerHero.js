import Link from "next/link";
import Image from "next/image";
import { ButtonTypes } from "../../enums/buttonType";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "../../components/ui/dialog";

const BannerHero = ({ hero }) => {
  const findWord = (str, word) => {
    const reg = new RegExp(word, "gi");
    return str.replace(reg, `<span class="color-green-900">${word}</span>`);
  };

  const { title, subtitle, buttons } = hero || {};
  return (
    <>
      <div className="section-box">
        <div className="banner-hero banner-homepage6">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 mt-50 pb-120">
                <span className="tag-1 bg-orange-900">
                  Tax & Business Consulting
                </span>
                <h1
                  className="text-heading-2 mt-20"
                  dangerouslySetInnerHTML={{
                    __html: findWord(title || "", "WEBSITES"),
                  }}
                />
                <p className="text-body-lead-large color-gray-500 mt-30 pr-40">
                  {subtitle}
                </p>
                <div className="mt-40">
                  {buttons?.map((button, index) => {
                    let buttonClass = "btn btn-lg btn-primary icon-arrow-right";
                    if (index === 0) {
                      buttonClass = "icon-arrow-right-white";
                    } else if (index === 1) {
                      buttonClass = "icon-arrow-right";
                    }
                    const { theme } = button || {};
                    return (
                      <Dialog key={button.id}>
                        <DialogTrigger asChild>
                          <Link
                            href="#"
                            className={`btn ${ButtonTypes[theme]} ${buttonClass}  wow animate__animated animate__fadeIn`}
                            data-wow-delay={`${index + 1 / 2}`}
                          >
                            {button?.label || ""}
                          </Link>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl w-full h-[80vh]">
                          <iframe
                            src="https://outlook.office.com/book/SmartTaxAccounting@smartonlinetax.com.au/?ismsaljsauthenabled"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            title="Book Appointment"
                          />
                        </DialogContent>
                      </Dialog>
                    );
                  })}
                </div>
              </div>
              <div className="col-lg-5 d-none d-lg-block">
                <div className="banner-imgs">
                  <div className="block-1 shape-1">
                    <Image
                      src="/assets/imgs/page/homepage6/line-chart.svg"
                      alt="Agon"
                      width={120}
                      height={80}
                    />
                  </div>{" "}
                  <div className="block-2 shape-3">
                    <Image
                      src="/assets/imgs/page/homepage6/card.png"
                      alt="Agon"
                      width={300}
                      height={200}
                    />
                  </div>{" "}
                  <Image
                    className="img-banner img-responsive shape-2"
                    alt="Agon"
                    src="/assets/imgs/page/homepage6/banner.png"
                    width={500}
                    height={400}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-box box-slider-3 d-none d-lg-flex">
        <div className="container">
          <div className="block-slider-bottom-banner">{/* <Intro2/> */}</div>
        </div>
      </div>
    </>
  );
};

export default BannerHero;
