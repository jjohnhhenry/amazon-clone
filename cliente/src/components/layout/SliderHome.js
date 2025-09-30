import React, { useState } from 'react';
import '../../stylesComponents/sliderHome.css';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import img1 from '../../img/img1.jpg';
import img2 from '../../img/img2.jpg';
import img3 from '../../img/img3.jpg';
import img4 from '../../img/img4.jpg';

export const SliderHome = () => {

    let sliderArr = [img1, img2, img3, img4];

    const [x, setX] = useState(0);

    //const [queries, setQueries] = useState(false);
    

    const handleClickLef = () => {
            console.log(x)
            
            x === 0 ? setX(-100 * (sliderArr.length-1)) : setX(x + 100)
    };

    const handleClickRight = () => {
            console.log(x)
            x === -100 * (sliderArr.length-1) ? setX(0) : setX(x - 100);
    };

    return (
                <div className="slider">
                    {
                        sliderArr.map((item,index)=>(
                            <div key={index} className="slide" style={{transform:`translateX(${x}%)`}} >
                                <img src={item} alt="slide-img" className="slide--img"/>
                            </div>
                        ))
                    }
                    <ArrowForward onClick={handleClickRight} id="goRight" />
                    <ArrowBack onClick={handleClickLef} id="goLeft" />
                </div>
    )
}
