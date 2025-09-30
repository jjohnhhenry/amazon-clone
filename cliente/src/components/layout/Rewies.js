import React from 'react';
import '../../stylesComponents/rewies.css'

import StarOutlineIcon from '@material-ui/icons/StarOutline';
import StarIcon from '@material-ui/icons/Star';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Rating from '@material-ui/lab/Rating';

export default function Rewies() {

    const startOutlineIcon = () => <StarOutlineIcon id="rating--icon--white" />;
    const startIcon = () => <StarIcon id="rating--icon--fill" />;
    return (
        <>
            <div className="section--contained--rewies">
                <div className="section--contained--avarage--rating">
                    <h2 className="section--rating--title">Opiniones de clientes</h2>
                    <div className="section--contained--avarage--rating--stars">
                        <div className="product--section--item rating">
                                    <span className="rating--white">{Array(5).fill( startOutlineIcon() )}</span>
                                    <div className="row--product--raiting--fill">
                                        <span className="rating--fill">{Array(5).fill( startIcon() )}</span>
                                    </div>
                        </div>
                        <span>4.5 de 5</span>
                    </div>
                    <p>21 calificaciones globales</p>
                    <table className="section--table--rewies">
                        <tbody>
                            <tr className="section--columns--rewies">
                                <td>5 estrellas</td>
                                <td>
                                    <div className="progress--bar" >
                                        <div style={{width:"68%"}} className="percentage--progress" >
                                        </div>
                                    </div>
                                </td>
                                <td>68%</td>
                            </tr>
                            <tr className="section--columns--rewies">
                                <td>4 estrellas</td>
                                <td>
                                    <div className="progress--bar" >
                                        <div style={{width:"13%"}} className="percentage--progress" >
                                        </div>
                                    </div>
                                </td>
                                <td>13%</td>
                            </tr>
                            <tr className="section--columns--rewies">
                                <td>3 estrellas</td>
                                <td>
                                    <div className="progress--bar" >
                                        <div style={{width:"7%"}} className="percentage--progress" >
                                        </div>
                                    </div>
                                </td>
                                <td>7%</td>
                            </tr>
                            <tr className="section--columns--rewies">
                                <td>2 estrellas</td>
                                <td>
                                    <div className="progress--bar" >
                                        <div style={{width:"4%"}} className="percentage--progress" >
                                        </div>
                                    </div>
                                </td>
                                <td>4%</td>
                            </tr>
                            <tr className="section--columns--rewies">
                                <td>2 estrellas</td>
                                <td>
                                    <div className="progress--bar" >
                                        <div style={{width:"8%"}} className="percentage--progress" >
                                        </div>
                                    </div>
                                </td>
                                <td>8%</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="section--contained--write--rewies">
                        <h4 className="section--rating--title">Escribir opinión de este producto</h4>
                        <small>Comparte tu opinión con otros clientes</small>
                        <button className="btn--btn--rewies--btn">Escribir mi opinión</button>
                    </div>
                </div>
                <div className="section--contained--display--rewies">
                    <div className="section--rewies--client">
                        <div className="avatar--client">
                        <AccountCircleIcon style={{fontSize:"2rem"}} />
                        <span>John C.</span>
                        </div>
                        <div className="rating--rewie--client">
                            <Rating style={{color:"#e47911"}} name="read-only" value={4} readOnly/>
                        </div>
                        <div className="rating--rewie--client">
                            <p className="rating--rewie--client--rewie">Increíble features for the price, the option to change the looking in so many different options is something
                            that my wife is in love with, also the oximeter and all the vitals that can help you to trak, gives you a good
                            idea about your health, and one of the best things it comes with is the option to take pictures remotely
                            from your phone, I usually run against the timer to be hable to be on the picture but now I don’t such an
                            amazing feature.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
