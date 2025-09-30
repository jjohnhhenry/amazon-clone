import React, { useState } from 'react';

import '../../stylesComponents/sliderProducts.css';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';


import { SliderProduct } from './SliderProduct';

export const SliderProducts = (props) => {

    //console.log(props);

    const [scroll, setScroll] = useState(0);

    const handleClickLeft = () => {
        let dato = scroll + 300;
        if(dato > 0){
            dato = 0;
        }
        setScroll(dato);
    }
    const handleClickRigth = () => {
        let dato = scroll - 300;
        let carousel = props.long * 230;
        console.log(dato)
        if((window.innerWidth - carousel) > dato){
            let med = (window.innerWidth - carousel)
            let porc = props.long === 6 ? 0 : 20
            dato = med - porc
        }
        setScroll(dato);
    }

    return (
        <div>
            <div className="slider--row--produtcs">
                    <h2>{props.content.title}</h2>
                    <span>{props.content.accion}</span>
                        <div className="slider--row--area--products">
                            <div className="slider--row--item--products" style={{
                                marginLeft:scroll,
                                width: props.long * 230
                            }}>
                                {props.infoProduct.map(ele=>(
                                        <SliderProduct
                                            key ={ele.id}
                                            ele={ele}   
                                        />
                                ))}
                                <button className="btn-slider--products arrow-left" onClick={handleClickLeft} ><ArrowBack /></button>
                                <button className="btn-slider--products arrow-rigth" onClick={handleClickRigth}><ArrowForward /></button>
                            </div>
                        </div>
                </div>
        </div>
    )
}
