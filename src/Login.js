import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate=useNavigate();

    useEffect(()=>{
        sessionStorage.clear();
    },[]);

    const ProceedLogin = (e) => {
        e.preventDefault();
        if (validate()) {

            fetch("http://localhost:8000/user/" + username).then((res) => {
                return res.json();
            }).then((resp) => {

                if (Object.keys(resp).length === 0) {
                    toast.error('Por favor, ingrese un usuario válido');
                } else {
                    if (resp.password === password) {
                        toast.success('Éxito');
                        sessionStorage.setItem('username',username);
                        sessionStorage.setItem('userrole',resp.role);
                        usenavigate('/')
                    }else{
                        toast.error('Por favor, ingrese credenciales válidas');
                    }
                }
            }).catch((err) => {
                toast.error('Error al iniciar sesión debido a:' + err.message);
            });
        }
    }

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {

            let inputobj={"username": username,
            "password": password};
            fetch("https://localhost:44308/User/Authenticate",{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                console.log(resp)
                if (Object.keys(resp).length === 0) {
                    toast.error('Error al iniciar sesión, credenciales no válidas');
                }else{
                     toast.success('Éxito');
                     sessionStorage.setItem('username',username);
                     sessionStorage.setItem('jwttoken',resp.jwtToken);
                   usenavigate('/')
                }

            }).catch((err) => {
                toast.error('Error al iniciar sesión debido a:' + err.message);
            });
        }
    }

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Por favor, ingrese el nombre de usuario');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Por favor, ingrese contraseña');
        }
        return result;
    }

    return (
        <div style={{ backgroundColor: '#FCE4EC', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="col-lg-6" style={{ marginTop: '100px', background: '#FFF', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
                <form onSubmit={ProceedLogin} className="container">
                    <div className="card">
                        <div className="card-header">
                            <h2 style={{ color: '#FF4081' }}>Inicio de sesión de usuario</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label style={{ color: '#FF4081' }}>Nombre de Usuario <span className="errmsg">*</span></label>
                                <input value={username} onChange={e => usernameupdate(e.target.value)} className="form-control" style={{ borderColor: '#FF4081' }} />
                            </div>
                            <div className="form-group">
                                <label style={{ color: '#FF4081' }}>Contraseña<span className="errmsg">*</span></label>
                                <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control" style={{ borderColor: '#FF4081' }} />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#FF4081', border: 'none' }}>Iniciar Sesión</button> |
                            <Link className="btn btn-success" to={'/register'} style={{ backgroundColor: '#FF4081', border: 'none' }}>Nuevo Usuario</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
