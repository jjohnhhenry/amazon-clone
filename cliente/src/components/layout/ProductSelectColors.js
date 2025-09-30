import React from 'react';
import '../../stylesComponents/product.css'

export const ProductSelectColors = ({colors, setImgMain}) => {

    const handleSelectColor = () => {
        setImgMain({
            img:colors.url,
            color:colors.color
        })
    }

    return (
        <>
            <li className="item--select--color" onClick={handleSelectColor} >
                <img src={colors.url} alt="img" />  
            </li>
        </>
    )
}
