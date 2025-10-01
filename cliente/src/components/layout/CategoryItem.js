import React from 'react';
import { useHistory } from 'react-router-dom';
import { CATEGORY_DISPLAY_MAP } from '../../constants/categories';
import '../../stylesComponents/categoryItem.css';

export const CategoryItem = ({category}) => {
    const history = useHistory();

    const handleClick = () => {
        const categoryKey = CATEGORY_DISPLAY_MAP[category.title] || category.title;
        history.push(`/category/${categoryKey}`);
    };

    return (
        <div className="category--main--item" onClick={handleClick}>
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
