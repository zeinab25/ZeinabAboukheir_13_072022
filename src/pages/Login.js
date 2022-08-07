import React, { useRef } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFail } from "../features/loginSlice";
import { getToken } from "../userApi";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
	const passwordRef = useRef();
	const userNameRef = useRef();
	const { isAuth, error } = useSelector((state) => state.login);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();

		getToken(userNameRef.current.value, passwordRef.current.value)
			.then((token) => {
				localStorage.setItem("token", token);
				dispatch(loginSuccess());
			})
			.catch((error) => {
				if (error.response.status === 400) {
					dispatch(loginFail("Erreur d'identification"));
				} else {
					dispatch(loginFail("Oups! Connexion impossible. Veuillez réesayer plus tard."));
					console.log(error);
				}
			});
	};

	return (
		<>
			{isAuth && <Navigate replace to="/user/profile" />}
			<Header />
			<main className="main bg-dark">
				<section className="sign-in-content">
					<i className="fa fa-user-circle sign-in-icon"></i>
					<h1>Sign In</h1>
					{error && <p style={{ color: "red" }}>{error}</p>}
					<form onSubmit={handleSubmit}>
						<div className="input-wrapper">
							<label for="username">Username</label>
							<input type="text" id="username" ref={userNameRef} />
						</div>
						<div className="input-wrapper">
							<label for="password">Password</label>
							<input type="password" id="password" ref={passwordRef} />
						</div>
						<div className="input-remember">
							<input type="checkbox" id="remember-me" />
							<label for="remember-me">Remember me</label>
						</div>
						<button className="sign-in-button" type="submit">
							Sign In
						</button>
					</form>
				</section>
			</main>
			<Footer />
		</>
	);
}
