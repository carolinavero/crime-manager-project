import React from 'react';

export default function Card () {

    return (
        <>

        <div className="card crime">
            <div className="crime__title">
                Ideological Falsehood
            </div>
            <div className="crime__type mb-3">Crime type</div>
            <div className="crime__date"> 2020/11/03 - 00:00:00</div>
            <div className="crime__country">País</div>

            <div className="crime__zoom-button">
                <a href="/" className="zoom-button">
                    <i className="fa fa-search-plus"></i>
                </a>
            </div>
           

        </div>

        
        </>
    )
}

