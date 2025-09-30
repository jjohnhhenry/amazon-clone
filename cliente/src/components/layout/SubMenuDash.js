import React from 'react';
import { Link } from 'react-router-dom';

import '../../stylesComponents/submenuDash.css';

import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

export const SubMenuDash = () => {
    return (
        <>
                <div className="section--menu--dashboard" >
                    <ul>
                        <Link to="/vendor-dashboard"><li><TrendingUpIcon />Dashboard</li></Link>
                        <Link to="/vendor-dashboard"><li><DevicesOtherIcon /> Products</li></Link>
                        <Link to="/vendor-dashboard"><li><ShoppingCartIcon /> Orders</li></Link>
                        <li><EqualizerIcon /> Reports</li>
                        <li><EqualizerIcon /> Reports</li>
                        <li><QuestionAnswerIcon /> Reviews</li>
                    </ul>

                </div>
        </>
    )
}
