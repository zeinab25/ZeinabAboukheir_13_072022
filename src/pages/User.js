import React, { useEffect, useRef } from "react";
import { editName } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { postEditName } from "../userApi";
import Header from "../components/Header";
import Footer from "../components/Footer";
import getUserProfile from "../userAction";

export default function User() {
	const { user, error } = useSelector((state) => state.user);
	const { isEditName } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const lastNameRef = useRef();
	const firstNameRef = useRef();

	useEffect(() => {
		getUserProfile(dispatch);
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		postEditName(
			firstNameRef.current.value === "" ? user.firstName : firstNameRef.current.value,
			lastNameRef.current.value === "" ? user.lastName : lastNameRef.current.value,
		).then(() => {
			getUserProfile(dispatch);
		});

		dispatch(editName(false));
	};

	const EventCancel = (e) => {
		dispatch(editName(false));
	};

	const EventEditName = (e) => {
		dispatch(editName(true));
	};

	if (error) {
		return (
			<>
				<Header />
				<main className="error main bg-dark">
					<p>{error}</p>
				</main>
				<Footer />
			</>
		);
	}

	return (
		<>
			<Header />
			<main className="main bg-dark">
				{isEditName ? (
					<div className="header">
						<form onSubmit={handleSubmit}>
							<h1>Welcome back</h1>
							<input
								className="edit-input name"
								autoComplete="off"
								type="text"
								placeholder={user.firstName}
								ref={firstNameRef}
							/>
							<input
								className="edit-input name"
								autoComplete="off"
								type="text"
								placeholder={user.lastName}
								ref={lastNameRef}
							/>
							<br /> <br />
							<button type="submit" className="save-button">
								Save
							</button>
							<button
								onClick={() => {
									EventCancel();
								}}
								className="cancel-button"
							>
								Cancel
							</button>
						</form>
					</div>
				) : (
					<div className="header">
						<h1>
							Welcome back
							<div className="name">
								{user.firstName} {user.lastName}
							</div>
						</h1>
						<button
							onClick={() => {
								EventEditName();
							}}
							className="edit-button"
						>
							Edit Name
						</button>
					</div>
				)}

				<h2 className="sr-only">Accounts</h2>
				<section className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">Argent Bank Checking (x8349)</h3>
						<p className="account-amount">$2,082.79</p>
						<p className="account-amount-description">Available Balance</p>
					</div>
					<div className="account-content-wrapper cta">
						<button className="transaction-button">View transactions</button>
					</div>
				</section>
				<section className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">Argent Bank Savings (x6712)</h3>
						<p className="account-amount">$10,928.42</p>
						<p className="account-amount-description">Available Balance</p>
					</div>
					<div className="account-content-wrapper cta">
						<button className="transaction-button">View transactions</button>
					</div>
				</section>
				<section className="account">
					<div className="account-content-wrapper">
						<h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
						<p className="account-amount">$184.30</p>
						<p className="account-amount-description">Current Balance</p>
					</div>
					<div className="account-content-wrapper cta">
						<button className="transaction-button">View transactions</button>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
