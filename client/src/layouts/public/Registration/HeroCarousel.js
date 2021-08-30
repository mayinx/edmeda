import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./HeroCarousel.css";

import CarouselPic1 from "../../../assets/shutterstock_165821084.jpg";
import CarouselPic2 from "../../../assets/Fotolia_56056726_L.jpg";
import CarouselPic3 from "../../../assets/student-with-ipad-technology-in-the-classroom1.jpg";
import CarouselPic4 from "../../../assets/young-college-students.jpg";
import CarouselPic5 from "../../../assets/shutterstock_165821084.jpg";
import CarouselPic6 from "../../../assets/SaferinternetatOIAT_1.jpg";
import CarouselPic7 from "../../../assets/shutterstock_1684741660.jpg";

export default () => (
  <Carousel
    className="HeroCarousel"
    // autoPlay
    // infiniteLoop
    // renderThumbs={() => {
    //   return false;
    // }}
    showThumbs={false}
  >
    {/* <Carousel autoPlay dynamicHeight={true}> */}
    <div>
      <img alt="" src={CarouselPic1} />
      <p className="legend">Legend 1</p>
    </div>
    <div>
      <img alt="" src={CarouselPic2} />
      <p className="legend">Legend 2</p>
    </div>
    <div>
      <img alt="" src={CarouselPic3} />
      <p className="legend">Legend 3</p>
    </div>
    <div>
      <img alt="" src={CarouselPic4} />
      <p className="legend">Legend 4</p>
    </div>
    <div>
      <img alt="" src={CarouselPic5} />
      <p className="legend">Legend 5</p>
    </div>
    <div>
      <img alt="" src={CarouselPic6} />
      <p className="legend">Legend 6</p>
    </div>
    <div>
      <img alt="" src={CarouselPic7} />
      <p className="legend">Legend 7</p>
    </div>
  </Carousel>
);
