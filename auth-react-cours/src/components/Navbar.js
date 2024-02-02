import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase.config"

export default function Navbar() {
    const {toggleModals} = useContext(UserContext);

	const navigate = useNavigate();

	const logOut = async () => {
		try{
			await signOut(auth);
		} catch {
			alert("For some reasons, we can't deconnect, please check your internet connection and retry.")
		}
	}
    return (
    <nav className="navbar navbar-light bg-light px-4">
        <Link to="/" className="navbar-brand">
            AuthJS
        </Link>

        <div>
            <button 
                onClick={() => toggleModals("signUp")}
                className="btn btn-primary">
                Sign Up
            </button>
            <button
                onClick={() => toggleModals("signIn")}
                className="btn btn-primary ms-2">
                Sign In
            </button>
            <button
				onClick={logOut}
                className="btn btn-danger ms-2">
                Log Out
            </button>
        </div>
    </nav>
	)
}

// Type "RFC" and press enter to create a React Functional Component