import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Footer({ footerButton, handleFooterButton, footerLink, footerLinkTo }) {

    return (
        <>
            <footer>

                {
                    footerButton && 

                    <Button
                        variant="primary"
                        className="btn btn-primary d-sm-none"
                        onClick={(e) => handleFooterButton(e)} >
                        <i className="fa fa-plus-square-o"></i> {footerButton}
                    </Button>
                }

                {
                    footerLink &&

                    <Link to={footerLinkTo} 
                        className="btn btn-primary d-sm-none" >
                         <i className="fa fa-plus-square-o"></i> {footerLink}
                    </Link>

                }

            </footer>
        </>
    )
}
