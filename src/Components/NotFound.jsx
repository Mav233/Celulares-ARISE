import React from 'react';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="text-center mt-8">
            <h1 style={{ fontSize: '3rem', color: '#FF4C4C' }}>404</h1>
            <p style={{ fontSize: '1.5rem' }}>Página no encontrada</p>
            <Link to="/">
                <Button label="Volver al inicio" icon="pi pi-home" className="mt-3" />
            </Link>
        </div>
    );
};

export default NotFound;
