import React, {type FC} from 'react'
import './Preloader.css'

export const Preloader:FC = () => {
    return (
        <div className="preloader">
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};