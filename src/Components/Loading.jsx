import React from 'react';
import '../styles/styles.css';

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Cargando productos...</p>
        </div>
    );
};

export default Loading;
