import React from 'react'
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import slides from './Slides';
import "./Slider.css";


const Slider = () => {
    return (
        <div className="carousel-container">
            <div className="carousel-title">
                <h2>Nosotros</h2>
            </div>

        <Carousel
                arrows
                slidesPerpage={3}
                infinite
                animationSpeed={200}
                centered
                offset={50}
                itemWidth={400}
                slides={slides} 
                breakpoints ={{
                    960: {
                        slidesPerpage :1,
                        arrows:false,
                        itemWidth: 250,
                    }
                    }}
                    />
                    </div>   
                    );
};

export default Slider
