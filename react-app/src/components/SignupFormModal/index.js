import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import { useModal } from "../../context/Modal";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [first_name, setFirstName] = useState("")
	const [last_name, setLastName] = useState("")
	const [profile_pic, setProfilePic] = useState("")
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	const { closeModal } = useModal()

	// useEffect(() => {
	// 	setErrors([])
	// }, [
	// 	dispatch,
	// 	handleSubmit,
	// 	username.length,
	// 	email.length,
	// 	first_name.length,
	// 	last_name.length,
	// 	profile_pic.length,
	// 	password.length,
	// 	confirmPassword.length
	// ])

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword && !Object.values(errors).length) {
			const data = await dispatch(signUp(username, email, first_name, last_name, profile_pic, password));
			// closeModal()
			if (data) {
				console.log("SignupFormModal data: ", data)
			setErrors(data)
			} else {
				closeModal()
			}
		} else {
			setErrors(['Confirm Password field must be the same as the Password field']);
		}
	};

	useEffect(() => {
		setErrors([])
	}, [
		dispatch,
		username.length,
		email.length,
		first_name.length,
		last_name.length,
		profile_pic.length,
		password.length,
		confirmPassword.length
	])

	return (
		<div className="signup-form-container">
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<p>
				{errors.map((error, idx) => <p key={idx}>{error.split(":")[1]}</p>)}
				</p>
				<label>
				Email
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					// required
				/>
				</label>
				{/* {errors.forEach((error) => error.includes("email") ? <div>ERROR</div> : <></>)} */}
				<label>
				Username
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					// required
				/>
				</label>
				<label>
				First Name
				<input
					type="text"
					value={first_name}
					onChange={(e) => setFirstName(e.target.value)}
					// required
				/>
				</label>
				<label>
				Last Name
				<input
					type="text"
					value={last_name}
					onChange={(e) => setLastName(e.target.value)}
					// required
				/>
				</label>
				<label>
				Profile Picture
				<input
					type="url"
					value={profile_pic}
					onChange={(e) => setProfilePic(e.target.value)}
					// required
				/>
				</label>
				<label>
				Password
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					// required
				/>
				</label>
				<label>
				Confirm Password
				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					// required
				/>
				</label>
				<button className="signup-button" type="submit">SEND IT!</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
