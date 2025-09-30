import React from 'react';
import '../../stylesComponents/categoryItem.css';

export const CategoryItem = ({category}) => {
    return (
        <div className="category--main--item">
                <div className="category--main--title">
                    <h2>{category.title}</h2>
                </div>
                <div className="category--main--wrap--img">
                    <img src={category.img} alt="img"/>
                </div>
                <div className="category--main--link">
                    <p>{category.accion}</p>
                </div>
        </div>
    )
}
