import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import "../../styles/Info.css";

function Info() {
  return (
    <>
        <Carousel
          interval={2000}
          fade
          nextIcon=""
          nextLabel=""
          prevLabel=""
          prevIcon=""
          className="Info-container"
        >
          <Carousel.Item>
            <Image
              fluid
              className="d-block w-100 Info-image"
              src="https://images.freekaamaal.com/post_images/1606817930.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              {/* <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              fluid
              className="d-block w-100 Info-image"
              src="https://t4.ftcdn.net/jpg/02/89/80/03/360_F_289800335_l89vweOGANYIhKuVHRgpGh5QRwKQMsQx.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              {/* <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image
              fluid
              className="d-block w-100 Info-image"
              src="https://s3.envato.com/files/269504081/DSC_8614%20copy.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              {/* <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
    </>
  );
}

export default Info;
