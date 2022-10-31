import React from 'react';
import {Carousel} from "react-bootstrap";

const CustomCarousel = (props) => {
    const {imageList} = props

    return (
        <Carousel className="advert-carousel">
            {imageList.map((image) => (
                <Carousel.Item interval={3000} key={image.id}>
                    <img
                        className="d-block w-100"
                        src={image.name}
                        alt={image.id}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default CustomCarousel;