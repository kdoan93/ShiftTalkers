import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../store/session";
import { useModal } from "../../context/Modal";
import "./SignupForm.css";
import { Redirect } from "react-router-dom";

function SignupFormModal() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [first_name, setFirstName] = useState("")
	const [last_name, setLastName] = useState("")
	const [profile_pic, setProfilePic] = useState("")
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const { closeModal } = useModal()

	if (sessionUser) return <Redirect to="/" />;

	// useEffect(() => {
	// 	const errors = {};

	// 	if (email)
	// })

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, first_name, last_name, profile_pic, password));
			closeModal()
			if (data) {
				console.log("SignupFormModal data: ", data)
			setErrors(data)
			}
		} else {
			setErrors(['Confirm Password field must be the same as the Password field']);
		}
	};

	return (
		<>
		<h1>Sign Up</h1>
		<form onSubmit={handleSubmit}>
			<ul>
			{errors.map((error, idx) => <li key={idx}>{error}</li>)}
			</ul>
			<label>
			Email
			<input
				type="text"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			</label>
			<label>
			Username
			<input
				type="text"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				required
			/>
			</label>
			<label>
			First Name
			<input
				type="text"
				value={first_name}
				onChange={(e) => setFirstName(e.target.value)}
				required
			/>
			</label>
			<label>
			Last Name
			<input
				type="text"
				value={last_name}
				onChange={(e) => setLastName(e.target.value)}
				required
			/>
			</label>
			<label>
			Profile Picture
			<input
				type="url"
				value={profile_pic}
				onChange={(e) => setProfilePic(e.target.value)}
				required
			/>
			</label>
			<label>
			Password
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			</label>
			<label>
			Confirm Password
			<input
				type="password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				required
			/>
			</label>
			<button type="submit">Sign Up</button>
		</form>
		</>
	);
}

export default SignupFormModal;
