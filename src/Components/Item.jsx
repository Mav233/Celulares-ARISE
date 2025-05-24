import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/styles.css';

const Item = ({ id, name, description, price }) => {
    const footer = (
        <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${price}</span>
            <Link to={`/producto/${id}`}>
                <Button label="Detalles" severity="secondary" raised />
            </Link>
        </div>
    );

    return (
        <Card title={name} footer={footer} className="m-2">
            <p>{description}</p>
        </Card>
    );
};

export default Item;
