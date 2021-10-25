import React from 'react'
import "./Cover.css";
import coverVideo from "../../media/coverVideo.mp4";

export const Cover = () => {
    return (<div className="cover-container">
        <video className="video" src={coverVideo} autoPlay loop muted/>
        <h1> GREEN CUP</h1> 
        <p>Quienes somos | Productos | Linéa Ecologica | Contactanos</p>
        </div>
    );

};

export default Cover;