import React from 'react'
import{Link, useLocation, useNavigate} from "react-router-dom";
import Alert from './Alert';


function Header() {
    let navigate = useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate("/login");
    }
    let location = useLocation();

    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Notess Book
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/">
                                Home
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"?"active":""}`}  to="/About">
                                About
                            </Link>
                        </li>
                        
                        
                    </ul>
                </div>
                {!localStorage.getItem('token')?<div className = "buttons">
                <Link className="btn btn-outline-light me-2" to="/login" role="button">Login</Link>
                <Link className="btn btn-warning" to="/signup" role="button">Sign Up</Link>
                </div>:<button onClick ={handleLogout} className="btn btn-outline-light me-2">Logout</button>}
            </div>
            
        </nav>

        <Alert/>
    </>
    )
}

export default Header