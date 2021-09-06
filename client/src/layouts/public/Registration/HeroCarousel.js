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
    autoPlay={false}
    infiniteLoop
    showThumbs={false}
  >
    {/* <Carousel autoPlay dynamicHeight={true}> */}
    <div>
      <img alt="" src={CarouselPic1} />
      <div className="legend">
        <div className="inner">
          <h1>Edmeda</h1>
          <p>Easy remote communication & collaboration for Schools!</p>
        </div>
      </div>
    </div>
    <div>
      <img alt="" src={CarouselPic2} />
      <div className="legend">
        <div className="inner">
          <h1>Communities</h1>
          <p>Limitless communities for Schools - limitless possibilities!</p>
        </div>
      </div>
    </div>
    <div>
      <img alt="" src={CarouselPic3} />
      <div className="legend">
        <div className="inner">
          <h1>User Groups</h1>
          <p style={{ width: "350px" }}>
            Each community consists of multiple user groups - for every
            occasion: School-subjects, Students, Parents, Teachers...
          </p>
        </div>
      </div>
    </div>
    <div>
      <img alt="" src={CarouselPic4} />
      <div className="legend">
        <div className="inner">
          <h1>Group Chats</h1>
          <p style={{ width: "350px" }}>
            Each user group is equipped with its own Group Chat - thus enabling
            the members to communicate and collaborate efficiently as a team!
          </p>
        </div>
      </div>
    </div>
    <div>
      <img alt="" src={CarouselPic5} />
      <div className="legend">
        <div className="inner">
          <h1>Edmeda</h1>
          <p>Easy remote communication & collaboration for Schools!</p>
        </div>
      </div>
    </div>
    <div>
      <img alt="" src={CarouselPic6} />
      <div className="legend">
        <div className="inner">
          <h1>Edmeda</h1>
          <p>Easy remote communication & collaboration for Schools!</p>
        </div>
      </div>
    </div>
    <div>
      <img alt="" src={CarouselPic7} />
      <div className="legend">
        <div className="inner">
          <h1>Edmeda</h1>
          <p>Easy remote communication & collaboration for Schools!</p>
        </div>
      </div>
    </div>
  </Carousel>
);
