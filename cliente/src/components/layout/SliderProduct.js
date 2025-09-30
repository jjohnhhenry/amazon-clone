import React from 'react';
import { Link } from 'react-router-dom'; 

import '../../stylesComponents/sliderProducts.css';

export const SliderProduct = ({ele}) => {

    const urlDinamic = ele?.category?.replace(/\s+/g, '-').toLowerCase();

    return (
            <div className="slider--row-wraper--item--product" >
                {
                    urlDinamic ?
                        <Link to={{
                            pathname: `/${urlDinamic}/${ele.id}`,
                            state: {ele}
                        }} ><img src={ele.urls[0]?.urlsProduct} alt="img" />
                    </Link>
                    :
                        <Link to="/cart"> <img src={ele.img} alt="img" />
                        </Link>
                }
            </div>
    )
}
