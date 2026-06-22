import Carousel from "react-bootstrap/Carousel";
import HeroFirst from "../../assets/Img/Hero/HeroFirst.png";
import HeroSecond from "../../assets/Img/Hero/HeroSecond.png";
import HeroThree from "../../assets/Img/Hero/HeroThree.png";
import HeroFour from "../../assets/Img/Hero/HeroFour.png";
import HeroFive from "../../assets/Img/Hero/HeroFive.png";
import "./Hero.css";
const Hero = () => {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <img className="image" src={HeroFirst} alt="first silder" />
          <Carousel.Caption>
            <span>NEW COLLECTION</span>
            <h2>Cherish Every Precious Moment</h2>
            <p>Timeless toys for little dreams.</p>
            <button>SHOP NOW</button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="image" src={HeroSecond} alt="second silder" />
          <Carousel.Caption>
            <span>FAMILY COLLECTION</span>
            <h2>Celebrate Love And Togetherness</h2>
            <p>Beautiful moments made to last forever.</p>
            <button>SHOP NOW</button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="image" src={HeroThree} alt="third silder" />
          <Carousel.Caption>
            <span>KIDS FASHION</span>
            <h2>Style Little Moments Beautifully</h2>
            <p>Elegant outfits made for every special day.</p>
            <button>SHOP NOW</button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="image" src={HeroFour} alt="four silder" />
          <Carousel.Caption>
            <span>MEN'S COLLECTION</span>
            <h2>Timeless Style, Made For You</h2>
            <p>Classic looks for every modern moment.</p>
            <button>SHOP NOW</button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="image" src={HeroFive} alt="five silder" />
          <Carousel.Caption>
            <span>WOMEN'S COLLECTION</span>
            <h2>Timeless Elegance, Made For You</h2>
            <p>Luxurious jewelry for every cherished moment.</p>
            <button>SHOP NOW</button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>


      
    </>
  );
};

export default Hero;

