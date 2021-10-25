import React from 'react';
import"./About.css";

const About = () => {
    return (
        <div className="about-container">
            <div  className="about-desc">
                <h3>MATERIA PRIMA</h3>
                <p>
                    Nuestros productos están elaborados principalmente a base de fuentes renovables y sostenibles como el almidón de maíz y otros Biopolímeros PP y PE, que al cumplir su ciclo, vuelve a la naturaleza.
                    </p>
            </div>
            <div className="about-img">
                <img src="https://cdn.pixabay.com/photo/2014/11/09/21/51/corn-524259_960_720.jpg" alt ="about"/>
            </div>
        </div>
    );
};

export default About
