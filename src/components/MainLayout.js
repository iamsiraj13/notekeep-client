import React from 'react';
import { Container } from 'react-bootstrap';
import './MainLayout.css';
const MainLayout = ({title, children}) => {
    return (
        <div className='mainback'>
            <Container>
                <div className="page">
                    {title && (
                        <>
                            <h1 className="heading">{title}</h1>
                        </>
                    )}
                    {children}
                </div>
            </Container>
        </div>
    );
};

export default MainLayout; 