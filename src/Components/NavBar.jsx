import React, { useState } from 'react';
import { Menu } from 'antd';
import { MobileFilled, AppstoreOutlined, RocketFilled, CustomerServiceOutlined } from '@ant-design/icons';
import CartWidget from './CartWidget';
import '../Components/styles.css';
// import ItemListContainer from '../Components/ItemListContainer.jsx';

const NavBar = () => {
    const [openKeys, setOpenKeys] = useState([]);

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
                openKeys={openKeys}
                onOpenChange={onOpenChange}
            />
            <CartWidget />
            {/* <ItemListContainer /> */}
        </div>
    );
};

export default NavBar;