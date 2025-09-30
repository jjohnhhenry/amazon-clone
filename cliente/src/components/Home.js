import React from 'react';

import { useQuery, gql } from '@apollo/client';

import '../stylesComponents/home.css';
import { CategoryMain } from './layout/CategoryMain';
import { SliderHome } from './layout/SliderHome';
import { SubMenu } from './layout/SubMenu';

import { SliderProducts } from './layout/SliderProducts';

import amz1 from '../img/amz1.png';
import amz2 from '../img/amz2.jpg';
import amz3 from '../img/amz3.png';
import amz4 from '../img/amz4.jpg';
import amz5 from '../img/amz5.jpg';
import amz6 from '../img/amz6.jpg';

import pro1 from '../img/pro1.jpg';
import pro2 from '../img/pro2.jpg';
import pro3 from '../img/pro3.jpg';
import pro4 from '../img/pro4.jpg';
import pro5 from '../img/pro5.jpg';
import pro6 from '../img/pro6.jpg';
import pro7 from '../img/pro7.jpg';
import pro8 from '../img/pro8.jpg';
import pro9 from '../img/pro9.jpg';
import { HistorialProduct } from './layout/HistorialProduct';



const GET_PRODUCTS = gql`
    query getProducts {
        getProducts {
            name
            id
            price
            ofert
            stock
            category
            description
            urls {
                urlsProduct
            }
        }
    }
`;



export const Home = () => {

    const { data, loading, error } = useQuery(GET_PRODUCTS);
    console.log("RENDER")

    if ( loading ) return null;
    if ( !data ) return null;

    const { getProducts } = data;
    console.log(getProducts);

    const amazon = [
        
        {"id":"0111", "img":amz1}, {"id":"0112", "img":amz2}, {"id":"0113", "img":amz3}, {"id":"0114", "img":amz4}, {"id":"0115", "img":amz5}, {"id":"0116", "img":amz6}
    ]

    const titles = {
        "title":"Descubre Amazon",
        "accion":"Más información"
    }

    const masVendidos = {
        "title":"Más Vendidos de Amazon",
        "accion":"Compra Ahora",
        "feature":[{"id":"0101", "img":pro1}, {"id":"0102", "img":pro2}, {"id":"0103", "img":pro3}, {"id":"0104", "img":pro4}, {"id":"0105", "img":pro5}, {"id":"0106", "img":pro6} , {"id":"0107", "img":pro7},{"id":"0108", "img":pro8}, {"id":"0109", "img":pro9}]
    
    }



    return (
        <div className="home">
            <div className="home--container">
                <SubMenu />
                <SliderHome />
                <CategoryMain />
                <SliderProducts content={titles} infoProduct={amazon} long={amazon.length} />
                <SliderProducts content={masVendidos} infoProduct={getProducts}  long={masVendidos.feature.length} />
                <HistorialProduct />
            </div>
        </div>
    )
}
