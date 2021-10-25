import React from "react";
import "./Slider.css";

const slidesInfo = [
    {
        src:
            "https://cdn.pixabay.com/photo/2016/08/19/16/37/corn-1605664_960_720.jpg",
        alt: "Project 1",
        desc: "Project 1",

    },
    {
        src: 
            "https://cdn.pixabay.com/photo/2020/12/25/15/45/coffee-cup-5859641_960_720.jpg",
        alt: "Project 2",
        desc: "Project 2"
    },
    {
        src: 
            "https://cdn.pixabay.com/photo/2019/04/10/20/30/cutlery-4118132_960_720.jpg",
        alt: "Project 3",
        desc: "Project 3",
    },
];

const slides = slidesInfo.map((slide) => (
    <div className="slide-container">
        <img src={slide.src} alt={slide.alt}/>
        <div className="slide-desc">
            <span>{slide.desc}</span>
        </div>

    </div>
));

export default slides;