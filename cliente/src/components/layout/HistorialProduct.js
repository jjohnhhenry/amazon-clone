import React from 'react';
import '../../stylesComponents/historialProduct.css';

export const HistorialProduct = () => {
    return (
        <div>
            <div className="slider--historial--produtcs">
                    <hr />
                    <div className="slider--historial--title">
                        <h2>Inspirado por tu historial de búsqueda</h2>
                    </div>
                    <div className="slider--historial--button">
                        <button className="button--button">Inicia sesión para obtener recomendaciones personalizadas</button>
                    </div>
                    
                        {/*<div className="slider--row--area--products">
                            <div className="slider--row--item--products" style={{
                                marginLeft:scroll,
                                width: props.long * 230
                            }}>
                                {props.content.feature.map(ele=>(
                                        <SliderProduct
                                            key ={ele.id}
                                            ele={ele}   
                                        />
                                ))}
                                <button className="btn-slider--products arrow-left" onClick={handleClickLeft} ><ArrowBack /></button>
                                <button className="btn-slider--products arrow-rigth" onClick={handleClickRigth}><ArrowForward /></button>
                            </div>
                        </div>*/}
                </div>
        </div>
    )
}

