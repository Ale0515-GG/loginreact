import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [password, passwordchange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [country, countrychange] = useState("india");
    const [address, addresschange] = useState("");
    const [gender, genderchange] = useState("female");

    const navigate = useNavigate();

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = 'Por favor ingrese el valor en';
        if (id === null || id === '') {
            isproceed = false;
            errormessage += ' Username';
        }
        if (name === null || name === '') {
            isproceed = false;
            errormessage += ' Fullname';
        }
        if (password === null || password === '') {
            isproceed = false;
            errormessage += ' Password';
        }
        if (email === null || email === '') {
            isproceed = false;
            errormessage += ' Email';
        }

        if (!isproceed) {
            toast.warning(errormessage)
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {

            } else {
                isproceed = false;
                toast.warning('Por favor ingrese el correo electrónico válido')
            }
        }
        return isproceed;
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = { id, name, password, email, phone, country, address, gender };
        if (IsValidate()) {
            fetch("http://localhost:8000/user", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regobj)
            }).then((res) => {
                toast.success('Registrado correctamente.')
                navigate('/login');
            }).catch((err) => {
                toast.error('Fallido :' + err.message);
            });
        }
    }

    return (
        <div style={{ backgroundColor: '#FCE4EC', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="col-lg-6" style={{ background: '#FFF', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <form onSubmit={handlesubmit}>
                    <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#FF4081' }}>Registrar Usuario</h1>
                    <div className="form-group">
                        <label style={{ color: '#FF4081' }}>Nombre de Usuario <span className="errmsg">*</span></label>
                        <input value={id} onChange={e => idchange(e.target.value)} className="form-control" style={{ borderColor: '#FF4081' }} />
                    </div>
                    <div className="form-group">
                        <label style={{ color: '#FF4081' }}>Contraseña <span className="errmsg">*</span></label>
                        <input value={password} onChange={e => passwordchange(e.target.value)} type="password" className="form-control" style={{ borderColor: '#FF4081' }} />
                    </div>
                    <div className="form-group">
                        <label style={{ color: '#FF4081' }}>Nombre Completo <span className="errmsg">*</span></label>
                        <input value={name} onChange={e => namechange(e.target.value)} className="form-control" style={{ borderColor: '#FF4081' }} />
                    </div>
                    <div className="form-group">
                        <label style={{ color: '#FF4081' }}>Email/Correo <span className="errmsg">*</span></label>
                        <input value={email} onChange={e => emailchange(e.target.value)} className="form-control" style={{ borderColor: '#FF4081' }} />
                    </div>
                    <div className="form-group">
                        <label style={{ color: '#FF4081' }}>Telefono <span className="errmsg"></span></label>
                        <input value={phone} onChange={e => phonechange(e.target.value)} className="form-control" style={{ borderColor: '#FF4081' }} />
                    </div>
                    <div className="form-group">
                        <label style={{ color: '#FF4081' }}>Pais<span className="errmsg">*</span></label>
                        <select value={country} onChange={e => countrychange(e.target.value)} className="form-control" style={{ borderColor: '#FF4081' }}>
                            <option value="india">Mexico</option>
                            <option value="usa">USA</option>
                            <option value="singapore">Canada</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label style={{ color: '#FF4081' }}>Genero</label>
                        <br />
                        <input type="radio" checked={gender === 'male'} onChange={e => genderchange(e.target.value)} name="gender" value="male" className="app-check" style={{ borderColor: '#FF4081' }} />
                        <label style={{ color: '#FF4081' }}>Masculino</label>
                        <input type="radio" checked={gender === 'female'} onChange={e => genderchange(e.target.value)} name="gender" value="female" className="app-check" style={{ borderColor: '#FF4081' }} />
                        <label style={{ color: '#FF4081' }}>Femenino</label>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#FF4081', border: 'none' }}>Registrar</button>
                        <span style={{ margin: '0 10px' }}>|</span>
                        <Link to={'/login'} className="btn btn-danger" style={{ backgroundColor: '#FF4081', border: 'none' }}>Cerrar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
