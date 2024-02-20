import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
    const usenavigate = useNavigate();
    const [customerlist, listupdate] = useState(null);

    useEffect(() => {
        // Código adicional que puedas necesitar en el useEffect
    }, []);

    const containerStyle = {
        backgroundColor: '#FCE4EC',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div style={containerStyle}>
            <div style={{ textAlign: 'center', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', background: 'rgba(255, 255, 255, 0.8)' }}>
                <h1 style={{ color: '#FF4081' }}>¡Bienvenido a esta espectacular Página Barron!</h1>
                {/* Contenido adicional aquí */}
            </div>
        </div>
    );
}

export default Home;
