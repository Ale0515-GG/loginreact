import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Appheader = () => {
    const [displayusername, displayusernameupdate] = useState('');
    const [showmenu, showmenuupdateupdate] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            showmenuupdateupdate(false);
        } else {
            showmenuupdateupdate(true);
            let username = sessionStorage.getItem('username');
            if (username === '' || username === null) {
                usenavigate('/login');
            } else {
                displayusernameupdate(username);
            }
        }
    }, [location]);

    const headerStyle = {
        background: '#FF69B4', // Tono de rosa oscuro
        padding: '15px', // Aumenta el espacio interno
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const linkStyle = {
        textDecoration: 'none',
        color: '#FFF', // Texto en blanco para mayor contraste
        marginRight: '15px', // Aumenta el espacio entre enlaces
        fontSize: '18px', // Tamaño de letra más grande
    };

    const welcomeStyle = {
        marginLeft: 'auto',
        fontSize: '20px', // Tamaño de letra más grande
        color: '#FFF', // Texto en blanco para mayor contraste
    };

    const logoutStyle = {
        float: 'right',
        color: '#FFF', // Texto en blanco para mayor contraste
        fontSize: '18px', // Tamaño de letra más grande
    };

    return (
        <div>
            {showmenu && (
                <div style={headerStyle} className="header">
                    <Link to={'/'} style={linkStyle}>Hola</Link>
                    <Link to={'/customer'} style={linkStyle}>Cliente</Link>
                    <span style={welcomeStyle}>Bienvenido <b>{displayusername}</b></span>
                    <Link to={'/login'} style={logoutStyle}>Cerrar sesión</Link>
                </div>
            )}
        </div>
    );
};

export default Appheader;
