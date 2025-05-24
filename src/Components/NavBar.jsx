import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Menu } from 'antd';
import { MobileFilled, AppstoreOutlined, RocketFilled, CustomerServiceOutlined } from '@ant-design/icons';

import CartWidget from './CartWidget';
import '../styles/styles.css';

const NavBar = () => {
    const [openKeys, setOpenKeys] = useState([]);
    const navigate = useNavigate();

    const categoriaKeyToPath = {
        'setting:1': 'gama-alta',
        'setting:2': 'gama-media',
        'setting:3': 'gama-baja',
        'setting:4': 'ultimos-lanzamientos',
        'setting:5': 'apple',
        'setting:6': 'samsung',
        'setting:7': 'xiaomi',
        'setting:8': 'motorola',
        'setting:9': 'fundas-protectores',
        'setting:10': 'cargadores',
        'setting:11': 'audio-parlantes',
    };

    const handleMenuClick = (e) => {
        const key = e.key;
        const rutaCategoria = categoriaKeyToPath[key];
        if (rutaCategoria) {
            navigate(`/categoria/${rutaCategoria}`);
        } else if (key === 'mail') {
            navigate('/');
        }
    };

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find(key => !openKeys.includes(key));
        if (['SubMenu1', 'SubMenu2', 'SubMenu3'].includes(latestOpenKey)) {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        } else {
            setOpenKeys(keys);
        }
    };

    const items = [
        {
            label: 'Inicio',
            key: 'mail',
            icon: <AppstoreOutlined />,
        },
        {
            label: 'Celulares',
            key: 'SubMenu1',
            icon: <MobileFilled />,
            children: [
                {
                    type: 'group',
                    children: [
                        { label: 'Gama Alta', key: 'setting:1' },
                        { label: 'Gama Media', key: 'setting:2' },
                        { label: 'Gama Baja', key: 'setting:3' },
                        { label: 'Últimos Lanzamientos', key: 'setting:4' },
                    ],
                },
            ],
        },
        {
            label: 'Marcas',
            key: 'SubMenu2',
            icon: <RocketFilled />,
            children: [
                {
                    type: 'group',
                    children: [
                        { label: 'Apple', key: 'setting:5' },
                        { label: 'Samsung', key: 'setting:6' },
                        { label: 'Xiaomi', key: 'setting:7' },
                        { label: 'Motorola', key: 'setting:8' },
                    ],
                },
            ],
        },
        {
            label: 'Accesorios',
            key: 'SubMenu3',
            icon: <CustomerServiceOutlined />,
            children: [
                {
                    type: 'group',
                    children: [
                        { label: 'Fundas y Protectores', key: 'setting:9' },
                        { label: 'Cargadores', key: 'setting:10' },
                        { label: 'Audífonos y Parlantes', key: 'setting:11' },
                    ],
                },
            ],
        },
    ];

    return (
        <div className="navbar">
            <span>CELULARES ARISE</span>
            <Menu
                mode="horizontal"
                items={items}
                onClick={handleMenuClick}
            />
            <CartWidget />
        </div>
    );
};

export default NavBar;