import React from 'react';
import img101 from '../../img/img101.jpg';
import img102 from '../../img/img102.jpg';
import img103 from '../../img/img103.jpg';
import img104 from '../../img/img104.jpg';
import img105 from '../../img/img105.jpg';
import img106 from '../../img/img206.jpg';
import img107 from '../../img/img107.jpg';
import img108 from '../../img/img108.jpg';
import { CategoryItem } from './CategoryItem';

export const CategoryMain = () => {

    const categoryMain = [
        {"title":"AmazonBasics", "id":101, "img":img101, "accion":"Ver más"},
        {"title":"Televisores", "id":102, "img":img102, "accion":"Compra ahora"},
        {"title":"Salud y Hogar", "id":103, "img":img103, "accion":"Ver todo"},
        {"title":"Seleccionados en Belleza", "id":104, "img":img104, "accion":"Compra todo"},
        {"title":"Computadora y accesorios", "id":105, "img":img105, "accion":"Ver más"},
        {"title":"Deportes y Aire Libre", "id":106, "img":img106, "accion":"Ver más"},
        {"title":"Juguetes y Juegos", "id":107, "img":img107, "accion":"Compra ahora"},
        {"title":"Moda para mujer", "id":108, "img":img108, "accion":"Ver más"},
    ]
    return (
        <div style={{position:"relative", display:"flex", justifyContent:"center", width:"100%", flexFlow:"row wrap", zIndex:"2"}}>
                {categoryMain.map(category => (
                    <CategoryItem key={category.id} category={category} />
                ))}
            </div>
    )
}
