import React from 'react';

export default function Card (crimes) {


    return (
        <>
            
            {
            crimes.map((crime, index) =>
                <div key={index}>
                    <div className="card crime">
                        <div className="crime__title">
                            {crime.criminal_crime_types[0].crime_type}
                        </div>
                        <div className="crime__type mb-3">Crime type</div>
                        <div className="crime__date"> {crime.crime_date}</div>
                        <div className="crime__country">{crime.country}</div>

                        <div className="crime__zoom-button">
                            <a href="/" className="zoom-button">
                                <i className="fa fa-search-plus"></i>
                            </a>
                        </div>

                    </div> 
                </div>
            )}
            

                  
        </>
    )
}

